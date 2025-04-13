"use client";
import { fetchOneByTitle } from "@/lib/actions/logs.actions";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const DetailsPage = (
) => {
  const { title } = useParams();
  const [data, setdata] = useState<any>({});

  const decodedTitle = decodeURIComponent(title as string);

  useEffect(() => {
    (async function () {
      const logs = await fetchOneByTitle(decodedTitle);
      setdata(logs);
    
    })();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-bold text-3xl">Log Page</h1>
      <h1 className=" text-gray-400 text-xl ">{decodedTitle}</h1>

      <p className="text-black">{data?.solution}</p>
    </div>
  );
};

export default DetailsPage;
