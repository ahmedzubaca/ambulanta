import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "./lib/auth";

export async function proxy (request :NextRequest) {
    const session = await getSessionFromRequest(request);
    const { pathname } = request.nextUrl;

    const publicApiRoutes = [
        // Auth routes
        'api/auth/login',
        'api/auth/register',
        'api/auth/register-doctor',
        'api/auth/forgot-password',
        'api/auth/reset-password',
        'api/auth/logout',

        // Public doctor routes
        'api/doctors',
        'api/doctors/filter',
        'api/doctors/specializations',
        'api/doctors/',

        // Public Enum Data
        '/api/patients/bloodGroup',
        '/api/patients/genotype',

        // Static files
        '_next',
        '/favicon.ico',
        '/public',
        '/robots.txt',
        '/sitemap.xml'
    ]

    const isPublicApiRoute = publicApiRoutes.some(route => 
        pathname.startsWith(route));

    // Allow public routes
    if (isPublicApiRoute) {
        return NextResponse.next();
    }

    // Protected Api routes
    const protectedApiRoutes = [

        //User Management
        'api/users',
        'api/users/me',
        'api/users/by-id/',
        'api/users/all',
        'api/users/upate-password',
        'api/users/profile-picture',

        // Patient Management
        'api/patients/me',
        'api/patients/update-profile',
        'api/patients/',

        // Doctor Management
        'api/doctors/me',
        'api/doctors/update-profile',

        // Appointment Management
        'api/appointments',
        'api/appointments/book',
        'api/appointments/cancel',
        'api/appointments/complete',
        'api/appointments/my-appointments',
        'api/appointments/',

        // Consultation Management
        'api/consultations',
        'api/consultations/create',
        'api/consultations/complete',
        'api/consultations/history',
        'api/consultations/appointment',
    ]

    const isProtectedApiRoute = protectedApiRoutes.some(route => 
        pathname.startsWith(route)); 
        
    if (isProtectedApiRoute && !session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Route-based protection for Api Routes
    if (isProtectedApiRoute && session) {
       const userRoles = session.user?.roles || []; 

       // Doctors only routes
        const doctorsOnlyRoutes = [
            'api/doctors/me',
            'api/doctors/update-profile',
            'api/consultations/create',
            'api/consultations/complete',
        ];

        const isDoctorsOnlyRoute = doctorsOnlyRoutes.some(route => 
            pathname.startsWith(route));

        if (isDoctorsOnlyRoute && !userRoles.includes('doctor')) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        // Patients only routes
        const patientsOnlyRoutes = [
            'api/patients/me',
            'api/patients/update-profile',
            'api/appointments/book',
        ];

        const isPatientsOnlyRoute = patientsOnlyRoutes.some(route => 
            pathname.startsWith(route)); 
            
        if (isPatientsOnlyRoute && !userRoles.includes('patient')) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }       
    } 
    
    // Web routes protection
    const protectedWebRoutes = [

        // Patient Web Routes
        '/profile',
        '/book-appointment',
        '/my-appointments', 
        '/consultation-history',

        // Doctor Web Routes
        '/doctor',
        '/doctor/profile',
        '/doctor/appointments',
        '/doctor/create-consultation',
        '/doctor/patient-consultation-history'
    ] 

    const isProtectedWebRoute = protectedWebRoutes.some(route => 
        pathname.startsWith(route));
        
    // Auth web routes
    const authWebRoutes = [
        'auth/login',
        'auth/register',
        'auth/forgot-password',
        'auth/reset-password',
        'auth/register-doctor'
    ]

    const isAuthWebRoute = authWebRoutes.includes(pathname);

    // Redirect to login if accessing protected web route without session
    if (isProtectedWebRoute && !session) {
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('calbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect to home if accessing auth web route with session
    if (isAuthWebRoute && session) {
        const userRoles = session.user?.roles || [];
        let redirectPath = '/';
        if (userRoles.includes('doctor')) {
            redirectPath = '/doctor/profile';
        } else if (userRoles.includes('patient')) {
            redirectPath = '/profile';
        }
        return NextResponse.redirect(new URL(redirectPath, request.url));
    }

    // Role-based protection for web routes
    if (isProtectedWebRoute && session) {
         const userRoles = session.user?.roles || [];

        // Doctor only web routes
        const doctorOnlyWebRoutes = [
            '/doctor',
            '/doctor/profile',
            '/doctor/appointments',
            '/doctor/create-consultation',
            '/doctor/patient-consultation-history'
        ];
        const isDoctorOnlyWebRoute = doctorOnlyWebRoutes.some(route => 
            pathname.startsWith(route));
        if (isDoctorOnlyWebRoute && !userRoles.includes('doctor')) {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }

        // Patient only web routes
        const patientOnlyWebRoutes = [
            '/profile',
            '/book-appointment',
            '/my-appointments', 
            '/consultation-history'
        ];
        const isPatientOnlyWebRoute = patientOnlyWebRoutes.some(route => 
            pathname.startsWith(route));
        if (isPatientOnlyWebRoute && !userRoles.includes('patient')) {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }        
    }
    return NextResponse.next();
}

export const config = {
   matcher: [
    /* 
    *Match all request paths except for the ones starting with:
    *_next/static (static files)
    *_next/image (image optimization files)
    *favicon.ico (favicon file)
    *Any common image file extensions (png, jpg, jpeg, svg, gif, webp)
    *public folder
    *  This ensures that the middleware runs for all other routes.    
    */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp)$).*)',
 ] 
}
