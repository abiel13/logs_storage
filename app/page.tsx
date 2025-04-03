"use client";
import Input from "@/components/Input";
import React, { useState } from "react";

export type MessageI = {
  text: string;
  type: "sent" | "recieved";
};

const Home = () => {
  const [message, setMessage] = useState<MessageI[]>([]);

  return (
    <div className="flex flex-col items-center justify-center h-full  py-2">
      <div className="  flex-col gap-8 flex  h-[82vh] overflow-y-auto">
        {message.length ? (
          <div className="flex-1 w-full flex flex-col">
            {message.map((mes: MessageI, idx: number) => (
              <div
              key={idx}
                className={`max-w-[70%] py-2 px-6 rounded-lg ${
                  mes.type === "sent"
                    ? "bg-[#aaffaa] self-end"
                    : "bg-[#ddffdd] self start"
                }`}
              >
                <p className="">{mes.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-4xl font-bold text-center">
            Hello, Wanna Search The logs Or Internet
          </h1>
        )}
      </div>
      <div className="mt-auto w-full">
        <Input setMessage={setMessage} />
      </div>
    </div>
  );
};

export default Home;
