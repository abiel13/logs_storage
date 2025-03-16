"use client";
import { fetchOneByTitle } from "@/lib/actions/logs.actions";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const DetailsPage =  ({
  params,
}: {
  params: {
    title: string;
  };
}) => {
    const {title} = useParams()
  const [data, setdata] = useState<any>({});

  const decodedTitle = decodeURIComponent(title as string);

  useEffect(() => {
    const logs = fetchOneByTitle(decodedTitle);
    setdata(logs);
    console.log(logs);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-bold text-3xl">Details Page</h1>
      <h1 className=" text-gray-400 text-xl ">{decodedTitle}</h1>

      <p>
        {data?.solution}
      </p>
    </div>
  );
};

export default DetailsPage;
