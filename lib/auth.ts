import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { SessionPayload, User } from "./types";
import { NextRequest } from "next/server";

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);
const { cookies } = await import("next/headers");
const cookieStore = cookies();

export async function encrypt(payload :JWTPayload) {
   return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("240h")
      .sign(key);     
}

export async function decrypt(imput: string) : Promise<SessionPayload | null> {
    const { payload } = await jwtVerify(imput, key, {algorithms: ["HS256"]})
    return payload;
}

export async function createSessionToken(user: User) {
    const expires = new Date (Date.now() + 240 * 60 * 60 * 1000);
    const sessionToken = await encrypt({ user, expires});
    (await cookieStore).set('session', sessionToken, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });
}

export async function getSession(): Promise<SessionPayload | null> {
    const session = (await cookieStore).get('session')?.value;
    if (!session) return null;
    try {
        return await decrypt(session);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }        
        return null;
    }
}

export async function deleteSession() {
    (await cookieStore).delete('session');
}

export async function getSessionFromRequest(request: NextRequest) {
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) return null;
    const cookies = parseCookies(cookieHeader);
    const session = cookies.session;
    if (!session) return null;

    try {
        return await decrypt(session);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return null;
    }
}

function parseCookies(cookieHeader: string): Record<string, string> {
    const cookies: Record<string, string> = {};
    cookieHeader.split(';').forEach(cookie => {
        const [name, ...rest] = cookie.trim().split('=');
        cookies[name] = rest.join('=');
    });
    
    return cookies;
}