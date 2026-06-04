"use client"
import React from 'react'

const Button = () => {
    return (
        <div
            onClick={() => alert("Button clicked!")}
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer w-32 text-center"
        >
            Click me
        </div>
    )
}

export default Button
