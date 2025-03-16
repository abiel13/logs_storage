'use client'
import React from 'react'

const Input = () => {
  return (
    <div className='flex gap-3'>

        <input type="text" className="w-full p-4 border border-gray-300 rounded-md" placeholder="Search logs" />
        <button className='bg-[#31916c] text-white px-8 py-2 rounded-md'>
            Search
        </button>
    </div>
  )
}

export default Input