import React from 'react'

const ProductIdPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return (
        <div className='text-3xl'>Product ID Page {id}</div>
    )
}

export default ProductIdPage