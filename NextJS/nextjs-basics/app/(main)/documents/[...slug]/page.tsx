import React from 'react'

// Catch all routes
const DynamicDocumentPage = async({params}: {params: Promise<{slug: string[]}>}) => {
    const { slug } = await params;

    console.log(slug);
    return (
        <div>DynamicDocumentPage {slug.join("/")}</div>
    )
}

export default DynamicDocumentPage