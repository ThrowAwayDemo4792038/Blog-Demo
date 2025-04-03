"use client";

import React, { useEffect, useState } from 'react'
import { Merriweather } from 'next/font/google'
import { Courier_Prime } from 'next/font/google';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { signout } from '@/actions/auth.action';

const merriweather = Merriweather({
    subsets: ['latin'],
    weight: ['700'],
    style: ['normal'],
});

const courierPrime = Courier_Prime({
    subsets: ['latin'],
    weight: ['400'],
    style: ['normal', 'italic'],
});

function Navbar() {
    const [isLoading, setIsLoading] = useState(true);
    const [isUser, setIsUser] = useState<User | null>(null);

    useEffect(() => {
        const supabase = createClient();

        const isLoggedInViaSession = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                setIsUser(data?.session?.user || null);
                setIsLoading(!isLoading);
            }
            catch (e) {
                throw new Error("Error occured trying to get session data.")
            }
            finally {
                setIsLoading(false);
            }
        };

        isLoggedInViaSession();
    }, []);


    return (
        <div className='min-w-full flex flex-col justify-center items-center my-10'>
            <div className={`min-w-1/2 xl:min-w-[30%] space-y-4`}>
                <div className={`prose text-3xl ${merriweather.className} flex justify-center`}>Kovarsta&apos;s Web Ramble</div>
                <div className={`text-sm italic ${courierPrime.className} flex items-center justify-center`}>The ramble of an internet schizo</div>

                <div className='flex justify-center'>
                    <div>
                        {
                            isLoading
                                ?
                                <p>...</p>
                                :
                                isUser ?
                                    <button className='text-red-500' onClick={() => (signout(), setIsUser(null))}>Logout</button>
                                    :
                                    <a className='text-red-500' href='/login'>Signin</a>
                        }
                    </div>
                </div>

                <div className={`border-b-1 border-dotted border-b-gray-500 min-w-full mt-4`}></div>
            </div>
        </div>
    )
}

export default Navbar