"use client"
import React, { useState } from 'react'

const ClientPage = () => {
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const res = await fetch("https://api.freeapi.app/api/v1/public/randomusers/user/random");
            const jsonData = await res.json();
            setData(jsonData);
            alert("Data fetched successfully! Check console for details.");
            console.log(jsonData.data);
        }
        catch (error) {
            alert("Failed to fetch data");
            console.error("Error fetching data:", error);
        }
    }

    return (
        <div className='p-4 bg-gray-100 rounded-lg text-center m-4'>
            <h1 className="text-3xl font-bold text-gray-800">Welcome to Client Page! Client Side Rendering</h1>
            <button
                onClick={fetchData}
                className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Click Me
            </button>
        </div>
    )
}

export default ClientPage
