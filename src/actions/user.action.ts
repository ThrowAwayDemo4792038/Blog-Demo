"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function syncUser(username: string | null) {

    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return;

        const usernameToUse = username ?? user.email?.split('@')[0];

        const existingUser = await prisma.users.findUnique({
            where: {
                supabaseId: user.id,
            }
        })

        if (existingUser) return existingUser;

        const dbUser = await prisma.users.create({
            data: {
                supabaseId: user.id,
                username: usernameToUse!,
            }
        })

        return dbUser;

    }
    catch (error) {
        console.log("Error syncing user auth.")
    }
}

export async function isUserExistInDb() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return false;

        const existingUser = await prisma.users.findUnique({
            where: {
                supabaseId: user.id,
            }
        })

        if (existingUser) return true;
        else return false;

    } catch (error) {
        console.log("Error checking if the user exists.");
    }
}

export async function isAccountExist(email: string): Promise<boolean | string> {
    const supabase = await createClient();
    try {
        const { data , error} = await supabase.rpc('email_exists', { email_address: email });
        console.log(email);
        console.log(data);
        return data;
    }
    catch (error) {
        return "An error occured.";
    }
}