import React from 'react'
import { Merriweather } from 'next/font/google'
import { Courier_Prime } from 'next/font/google';

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

function Footer() {
    return (
        <div className='min-w-full flex flex-col justify-center items-center my-10'>
            <div className={`min-w-[70%] sm:min-w-full md:min-w-full xl:min-w-[30%] space-y-4`}>
                <div className={`border-b-1 border-dotted border-b-gray-500 min-w-full mt-4`}></div>


            </div>
        </div>
    )
}

export default Footer