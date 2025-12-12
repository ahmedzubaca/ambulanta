import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { createApiResponse } from "@/lib/res";
import bcrypt from "bcryptjs";
import { emailService } from "@/lib/email-service";
import { Prisma, Role, Specialization } from "@prisma/client";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, password, roles, licenseNumber, specialization = ['PATIENT'] } = body;

        // validate email
        
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return createApiResponse( 400, "Korisnik sa ovim emailom već postoji." , 400);
        }

        // Valdate doctors registration

        const isDoctor = roles.includes('DOCTOR');
        if (isDoctor && (!licenseNumber || !specialization)) {
            return createApiResponse( 400, "Doktori moraju unijeti broj licence i specializaciju." , 400);
        }

        // Ensure roles exist
        await ensureRolesExit();

        // Get roles from DB
        const roleRecords = await prisma.role.findMany({
            where: {
                name: {
                    in: roles.map((role: string) => role.toUpperCase())
                }
            }
        });

        if (roleRecords.length === 0) {
            return Response. json(
                createApiResponse( 400, "Nisu navedene ispravne kategorije." , 400)
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user with transaction
        const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            const newUser = await tx.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    roles: {
                        connect: roleRecords.map((role: Role) => ({ id: role.id }))
                    }
                },
                include: {
                    roles: true
                }
            })

            for(const role of roleRecords) {
                if (role.name === 'PATIENT') {
                    await tx.patient.create({
                        data: {
                            user: { connect: {id: newUser.id}}
                        }
                    })
                } else if (role.name === 'DOKTOR') {
                    await tx.doctor.create({
                        data: {
                            firstName: name.split(' ')[0] || '',
                            lastName: name.split(' ').slice(1).join(' ') || '',
                            specialization: specialization.toUpperCase() as Specialization,
                            licenseNumber: licenseNumber!,
                            user: { connect: { id: newUser.id}}
                        }
                    })
                }
            }

            return newUser;
            
        })

        // send welcome email
        await emailService.sendWelcomeEmail(result.email, result.name);
        return Response.json(
            createApiResponse(200, 'Registracija uspješna. Poslana vam je poruka dobrodošlice.', {
                email: result.email,
                name: result.name
            }), 
            { status: 200 }
        )   

    } catch (error: unknown) {
        console.error('Registration error:', error);
        const message = error instanceof Error ? error.message: 'Internal server error';
        return new Response(message, { status: 500})
    };

}


async function ensureRolesExit() {
    const roles = ['PATIENT', 'DOCTOR', 'ADMIN'];
    for (const roleName of roles) {
        await prisma.role.upsert({
            where: { name: roleName },
            update: {},
            create: { name: roleName }
        });
    }    
}