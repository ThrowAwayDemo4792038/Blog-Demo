"use client";

import { useState, MouseEvent } from "react";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { isUserExistInDb, syncUser } from "@/actions/user.action";
import { prisma } from "@/lib/prisma";

export default function LoginPage() {
    const supabase = createClient();
    const [errorMessage, setErrorMessage] = useState("");
    const [isBoarding, setBoarding] = useState(false);

    const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const form = e.currentTarget.form as HTMLFormElement;
        const formData = new FormData(form);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setErrorMessage(error.message);
        } else {
            
            setErrorMessage("");
            redirect('/')
            /*
            await syncUser();
            setErrorMessage("");
            redirect('/')
            */
        }
    };

    const handleBoarding = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const form = e.currentTarget.form as HTMLFormElement;
        const formData = new FormData(form);
        const username = formData.get("username") as string;
        await syncUser(username);
        setErrorMessage("");
        redirect('/')

    }

    return (
        <div className="flex flex-col min-w-screen justify-center items-center">
            {isBoarding ?
                <div>
                    <form className="max-w-[30%] flex flex-col gap-2 p-10 border border-yellow-50">
                        <label htmlFor="username">Username:</label>
                        <input className="p-1 text-zinc-900 bg-yellow-50" placeholder="Jane Doe" id="username" name="username" type="text" required />

                        <div className="mt-10 flex flex-col gap-2">
                            <button className="bg-red-600 p-2" onClick={handleBoarding}>Yep pretty sure that is my name</button>
                        </div>
                    </form>
                </div>
                :
                <form className="max-w-[30%] flex flex-col gap-2 p-10 border border-yellow-50">
                    <label htmlFor="email">Email:</label>
                    <input className="p-1 text-zinc-900 bg-yellow-50" placeholder="Kovarsta@koi.com" id="email" name="email" type="email" required />

                    <label htmlFor="password">Password:</label>
                    <input className="p-1 text-zinc-900 bg-yellow-50" placeholder="Password" id="password" name="password" type="password" required />

                    <div className="mt-10 flex flex-col gap-2">
                        <button className="bg-red-600 p-2" onClick={handleLogin}>Start schizoing</button>
                    </div>
                </form>
            }
            {errorMessage && (
                <p className="text-red-500 mt-2" aria-live="polite">
                    {errorMessage}
                </p>
            )}

        </div>
    );
}
