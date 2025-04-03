import React from 'react'
import SignUp from '../components/SignUp'
import { Toaster } from 'react-hot-toast'

function page() {
    return (
        <div className="flex flex-col min-h-screen justify-center items-center">
            <SignUp />
            <Toaster />
        </div>
    )
}

export default page