import Input from '@/components/Input'
import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full  py-2'>

    <div className='flex  flex-col gap-8'>
      <h1 className='text-4xl font-bold text-center'>
        Hello, Wanna Search The logs Or Internet
      </h1>

      <Input />
    </div>


    </div>
  )
}

export default Home