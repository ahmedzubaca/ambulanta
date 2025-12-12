import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const transporter = nodemailer.createTransport ({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
})

const TEMPLATE_DIR = process.env.TEMPLATE_DIR;

interface EmailOptions {
    to: string;
    subject: string;
    template: string;
    variables: { [key: string]: string };
}

export async function sendEmail(options: EmailOptions): Promise<void> {
    try {
        const templatePath = path.join(TEMPLATE_DIR || '', `${options.template}.html`);
        if (!fs.existsSync(templatePath)) {
            throw new Error(`Email template not found: ${templatePath}`);
        }
        let templateContent = fs.readFileSync(templatePath, 'utf-8');

        const allVariables = {
            ...options.variables,
            currentYear: new Date().getFullYear().toString(),
        };

        for (const [key, value] of Object.entries(allVariables)) {
            const placeholder = new RegExp( `{{${key}}}`, 'g');
            templateContent = templateContent.replace(placeholder, value);
        }

        const mailOptions = {
            from: process.env.SMTP_FROM,
            to: options.to,
            subject: options.subject,
            html: templateContent,
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

export const emailService = {
    sendWelcomeEmail: async (to: string, name: string) => {
        const loginLink = `${process.env.LOGIN_LINK}`;
        await sendEmail({
            to,
            subject: 'Dobro došli u Amulantu',
            template: 'welcome',
            variables: {
                name,
                loginLink,
            }
        })
    },

    sendPasswordResetEmail: async (to: string, name: string, code: string) => {
        const resetLink = `${process.env.RESET_LINK}=${code}`;
        await sendEmail({
            to,
            subject: 'Zahtjev za ažuriranje lozinke',
            template: 'password-reset',
            variables: {
                name,
                resetLink,
            }
        })
    },

    sendPasswordUpdateConfirmationEmail: async (to: string, name: string) => {
        await sendEmail({
            to,
            subject: 'Lozinka uspješno ažurirana',
            template: 'password-update-confirmation',
            variables: {
                name
            }
        })
    },

    sendPasswordChangeAlert: async (to: string, name: string) => {
        await sendEmail({
            to,
            subject: 'Sigurnosno upozorenje: promijenjena lozinka',
            template: 'password-change',
            variables: {
                name,
                changeTime: new Date().toLocaleString(),
            }
        })
    },

    sendDoctorAppointmentNotification: async (to: string, variables: { [key: string]: string }) => {
        await sendEmail({
            to,
            subject: 'Zakazan novi pregled',
            template: 'doctor-appointment',
            variables                  
        })
    },

        sendPatientAppointmentConfrmation: async (to: string, variables: { [key: string]: string }) => {
        await sendEmail({
            to,
            subject: 'Potvrđeno zakazivanje pregleda',
            template: 'patient-appointment',
            variables                  
        })
    },

        sendAppointmentCancelation: async (to: string, variables: { [key: string]: string }) => {
        await sendEmail({
            to,
            subject: 'Pregled otkazan',
            template: 'appointment-cancelation',
            variables                  
        })
    }
}