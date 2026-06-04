import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const AboutPage = ({ params }: { params: { id: string } }) => {
    const { id = "1" } = params;
    return (
        <div>
            <Image
                src="/airoplane.svg"
                width={200}
                height={200}
                alt="Picture of the author"
            />

            <Image
                src="https://chaicode.com/assets/white-1-CYshgcRl.webp"
                width={200}
                height={200}
                alt="Picture of the author" />

            <Link href={{
                pathname: "/contact",
                query: { name: "John Doe" }
            }}
                className='text-blue-500 hover:text-blue-700'
            >
                Go to contact
            </Link>

            <br />

            <Link
                href={`/products/${id}`}
                className="text-green-500 hover:text-green-700"
            >
                Product page id {id}
            </Link>
        </div>
    )
}

export default AboutPage