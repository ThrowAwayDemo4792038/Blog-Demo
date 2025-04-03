"use client";

import { useState, MouseEvent } from "react";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import toast from "react-hot-toast";
import { isAccountExist } from "@/actions/user.action";

export default function SignUp() {
    const supabase = createClient();
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignup = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('form working')
        const form = e.currentTarget.form as HTMLFormElement;
        const formData = new FormData(form);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const { error, data } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    isProfileComplete: false,
                },
            },
        });

        if (error) {
            setErrorMessage(error.message);
            toast.error("Error.")
        } else {
            toast.success("Account created! Please check your email for confirmation!");
            setErrorMessage("");
        }

    };

    return (
        <div className="flex flex-col min-w-screen justify-center items-center">
            <form className="max-w-[30%] flex flex-col gap-2 p-10 border border-yellow-50">
                <label htmlFor="email">Email:</label>
                <input className="p-1 text-zinc-900 bg-yellow-50" placeholder="kovarsta@koi.com" id="email" name="email" type="email" required />

                <label htmlFor="password">Password:</label>
                <input className="p-1 text-zinc-900 bg-yellow-50" placeholder="Password" id="password" name="password" type="password" required />

                <div className="mt-10 flex flex-col gap-2">
                    <button className="bg-red-600 p-2" onClick={handleSignup}>Sign up</button>
                </div>
            </form>
            {errorMessage && (
                <p className="text-red-500 mt-2" aria-live="polite">
                    {errorMessage}
                </p>
            )}
        </div>
    );
}
