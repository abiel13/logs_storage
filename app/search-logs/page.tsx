"use client";
import { fetchlogs } from "@/lib/actions/logs.actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchPage = () => {
  const [data, setdata] = useState<any>([]);
  const [count, setCount] = useState(0);
  const router = useRouter();


  useEffect(() => {
(   async function () {  const logs = await fetchlogs(count);
    console.log(logs);
    setdata(logs);}
  
  
  )()
  }, [count]);

  return (
    <div className="flex w-full flex-col gap-8 items-center">
  

      {/* content */}
      <div className="w-[80%] flex flex-col gap-4">
        {/* pagination */}
        <div className="flex gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold">Search Results</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setCount((count) => count - 1)}
              disabled={!data?.hasPrev}
              className={`${
                data?.hasPrev ? "text-[#31916c]" : "text-gray-400"
              } text-md font-bold cursor-pointer`}
            >
              prev
            </button>
            <button
              disabled={!data?.hasNext}
              onClick={() => setCount((count) => count + 1)}
              className={`${
                data?.hasNext ? "text-[#31916c]" : "text-gray-400"
              } text-md font-bold cursor-pointer `}
            >
              Next
            </button>
          </div>
        </div>

        {/* logs */}
        <div className="flex flex-col gap-4">
          {data?.data?.map((log: any, i: number) => (
            <div
              key={i}
              className=" shadow-lg flex justify-between items-center w-full h-20 rounded-lg px-2 py-3"
            >
              <h1 className="text-md font-semibold">{log.title}</h1>
              <Link
                href={`/details-page/${log.title}`}
                className="bg-[#31916c] text-white px-8 py-2 rounded-md shadow-md"
              >
                learn more
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
