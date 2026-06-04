import React from 'react'

const DynamicSlugPage = async ({ params }: { params: Promise<{ category: string, slug: string }> }) => {
    const { category, slug } = await params;
    return (
        <div>DynamicSlugPage {category}, {slug}</div>
    )
}

export default DynamicSlugPage