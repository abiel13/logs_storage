"use client";
import { MessageI } from "@/app/page";
import { SearchlogsOrNet } from "@/lib/actions/logs.actions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Input = ({ setMessage }: { setMessage: any }) => {
  const [question, setQuestion] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // create quesion message

    setMessage((prev: MessageI[]) => [
      ...prev,
      {
        text: question,
        type: "sent",
      },
    ]);

    // fetch response
    const response = await SearchlogsOrNet(question);

    console.log(response);

    if (response === "Redirect") router.push(`/search-logs/${question}`);
    else {
      setMessage((prev: MessageI[]) => [
        ...prev,
        {
          text: response,
          type: "recieved",
        },
      ]);
    }
  };
  return (
    <div className="flex gap-3">
      <input
        onChange={(e) => setQuestion(e.target.value)}
        type="text"
        className="w-full p-4 border border-gray-300 rounded-md"
        placeholder="Search logs"
      />
      <button
        type="submit"
        onSubmit={handleSubmit}
        onClick={handleSubmit}
        className="bg-[#31916c] text-white px-8 py-2 rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export default Input;
