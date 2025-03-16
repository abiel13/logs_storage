"use client";
import { fetchlogs } from "@/lib/actions/logs.actions";
import React, { useEffect, useState } from "react";

const SearchPage = () => {
    const [data, setdata] = useState<any>([])
    const [count, setCount] = useState(0)


    useEffect(() => {
      const logs =  fetchlogs(count)
      console.log(logs)
      setdata(logs)
    }   , [count])


    return (
    <div className="flex w-full flex-col gap-8 items-center">
      <div className="w-[80%] flex gap-3">
        <input
          type="text"
          className="w-full p-4 shadow-md rounded-md"
          placeholder="Search logs"
        />
        <button className="bg-[#31916c] text-white px-8 py-2 rounded-md shadow-md">
          Search
        </button>
      </div>

      {/* content */}
      <div className="w-[80%] flex flex-col gap-4">
        {/* pagination */}
        <div className="flex gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold">Search Results</h1>
          <div className="flex gap-4">
            <p className="text-[#31916c] font-semibold">Prev</p>
            <p className="text-[#31916c] font-semibold">Next</p>
          </div>
        </div>


        {/* logs */}
        <div className="flex flex-col gap-4">
            {
            data?.data?.map((log:any,i:number) => (
                <div key={i} className=" shadow-lg flex justify-between items-center w-full h-20 rounded-lg px-2 py-3">
                    <h1 className="text-md font-semibold">
                         {log.title}  
                    </h1>
                 <button className="bg-[#31916c] text-white px-8 py-2 rounded-md shadow-md">
                    learn more
                 </button>
                </div>    
            ))
            }

            </div>
      </div>

    </div>
  );
};

export default SearchPage;
