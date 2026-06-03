import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

const CustomNotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen text-center space-y-4'>
            <Image
                src="/page-not-found.svg"
                width={500}
                height={500}
                alt="Not Found"
                priority
                className="w-64 h-auto"
            />
            <h1 className='text-4xl font-bold'>404 - Page Not Found</h1>
            <p className='text-lg'>The page you are looking for does not exist.</p>
            <Link href="/" className='text-blue-500 hover:underline'>
                Go back home
            </Link>
        </div>
    )
}

export default CustomNotFound