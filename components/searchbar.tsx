'use client';


import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

const SearchBar = () => {
    const router = useRouter()
    const pathname = usePathname();

    if (pathname === '/') return null; // Don't show the search bar on the home page
  return (
    <div className="w-[80%] mx-auto flex gap-3">
    <input
      type="text"
      className="w-full p-4 shadow-md rounded-md"
      placeholder="Search logs"
      onChange={(e) => router.push(`/search-logs/${e.target.value}`)}
    />
    <button className="bg-[#31916c] text-white px-8 py-2 rounded-md shadow-md">
      Search
    </button>
  </div>
  )
}

export default SearchBar