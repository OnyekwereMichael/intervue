'use server';

import { auth, db } from "@/app/firebase/Admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

type CurrentUser = {
  id: string;
  username: string;
  // add more fields if needed
}

const ONE_WEEK = 60 * 60 * 24 * 7 * 1000;
export async function signUp(params: SignUpParams) {
    const { email, password, uid, username } = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get()
        if (userRecord.exists) {
            return {
                success: false,
                message: "User already exists, Pls sign in"
            }
        }

        await db.collection('users').doc(uid).set({
            email,
            password,
            uid,
            username
        });
        return {
            success: true,
            message: "User created successfully"
        }
    } catch (error: any) {
        console.error("Error signing up:", error);
        if (error.code === 'auth/email-already-in-use') {
            return {
                success: false,
                message: "Email already in use"
            }
        }

        return {
            success: false,
            message: "Error signing up"
        }
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: ONE_WEEK });

    cookieStore.set("session", sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax"
    });

}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;

    try {
        const userRecord = await auth.getUserByEmail(email);
        if (!userRecord) {
            return {
                success: false,
                message: "User not found, pls sign up"
            }
        }

        await setSessionCookie(idToken);
        return {
            success: true,
            message: "User signed in successfully",
        }
    } catch (error: any) {
        console.error("Error signing in:", error);
        return {
            success: false,
            message: "Error signing in"
        }
    }
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
        return null;
    }

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();
        if (!userRecord.exists) {
            return null;
        }
        return {
           ...(userRecord.data() as Omit<CurrentUser, 'id'>),
            id: userRecord.id,
        };
    } catch (error: any) {
        console.error("Error verifying session cookie:", error);
       
        return null;
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();
    if (!user) {
        return {
            isAuthenticated: false,
            user: null
        }
    }

    return {
    isAuthenticated: !!user,
    user: user || null
  }
    // return !!user

}

export async function signOut() {
    try {
        const cookieStore = await cookies();
        // Delete the session cookie
        cookieStore.delete("session");
        // Force revalidation of auth state
        await auth.revokeRefreshTokens(cookieStore.get("session")?.value || "");
        // Redirect to sign-in page
        redirect('/sign-in');
    } catch (error) {
        console.error("Error signing out:", error);
        // Still redirect even if there's an error
        redirect('/sign-in');
    }
}

