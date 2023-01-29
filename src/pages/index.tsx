import React from 'react'
import Link from 'next/link'

const Home = () => {
    return (
        <div className="flex items-start justify-center h-screen p-10">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Home Page</h1>
                <nav className="flex gap-5 mt-8">
                    <Link href={`/countries`}>
                        <button
                            className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600">
                            Countries
                        </button>
                    </Link>
                    <Link href={`/profile`}>
                        <button
                            className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600">
                            Profile
                        </button>
                    </Link>
                </nav>
            </div>
        </div>
    )
}

export default Home

