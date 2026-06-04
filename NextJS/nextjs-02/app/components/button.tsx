"use client"
import React from 'react'



export const Button = () => {
    return (
        <div
            onClick={() => alert("Button clicked!")}
            className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Click Me
        </div >
    )
}
