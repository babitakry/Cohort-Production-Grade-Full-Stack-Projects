"use client";
import React, { useEffect, useState } from 'react';

type ModalProps = {
    onClose: () => void;
};

function Modal({ onClose }: ModalProps) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-semibold mb-4 text-gray-950">Modal Opened!</h2>
                <p className="text-gray-600 mb-4">
                    This is a simple modal.
                </p>
                <button
                    onClick={onClose}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

const ClientPage = () => {
    const [data, setData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    async function fetchData() {
        const res = await fetch("https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=10");
        const data = await res.json();

        if (data) {
            setData(data.data);
            console.log(data);
            alert("Data Fetched Successfully");
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    console.log(window);
    return (
        <div className="flex gap-4 p-8">
            <button
                onClick={fetchData}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Click me
            </button>

            <button
                onClick={() => setIsOpen(true)}
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
                Open Modal
            </button>

            {isOpen && <Modal onClose={() => setIsOpen(false)} />}
        </div>
    )
}

export default ClientPage