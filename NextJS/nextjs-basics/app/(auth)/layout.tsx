import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode}) => {
    return (
        <div>
            <h1 className='text-3xl'>Auth Layout</h1>
            { children }
        </div>
    )
}

export default AuthLayout