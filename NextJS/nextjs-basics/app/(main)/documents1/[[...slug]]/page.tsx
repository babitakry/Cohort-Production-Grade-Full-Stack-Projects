import React from 'react'

const OptionalCatchAllRoutes = async({params}: {params: Promise<{slug: string[]}>}) => {
    const { slug } = await params;
    return (
        <div className='text-3xl'>Optional Catch All Routes {slug?.join("/")}</div>
    )
}

export default OptionalCatchAllRoutes