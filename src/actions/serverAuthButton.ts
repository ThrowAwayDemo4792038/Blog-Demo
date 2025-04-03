import { login, signup } from "@/actions/auth.action";
import React, { MouseEvent } from 'react';

const handleLogin = async (formData: FormData) => {
    const result = await login(formData);
    return result?.error || null;
}

const handleSignup = async (formData: FormData) => {
    const result = await signup(formData);
    return result?.error || null;
}

export const handleLoginButton = async (e: MouseEvent<HTMLButtonElement>, setMessage: React.Dispatch<React.SetStateAction<string>>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget.form as HTMLFormElement);
    const errorMessage = await handleLogin(formData);

    if (errorMessage) {
        setMessage(errorMessage);
    }
}

export const handleSignupButton = async (e: MouseEvent<HTMLButtonElement>, setMessage: React.Dispatch<React.SetStateAction<string>>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget.form as HTMLFormElement);
    const errorMessage = await handleSignup(formData);

    if (errorMessage) {
        setMessage(errorMessage);
    }
}
