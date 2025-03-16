import { routes } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="sticky top-0  h-[94vh] w-[15vw] flex flex-col gap-8 justify-around">
      <div className="">
        <h1 className="font-bold text-3xl text-white font-cursive italic">
          Log <span className="0">Ai</span>
        </h1>

        <div className="w-full h-[1px] bg-gray-400 mt-3" />
      </div>

      <div className="mt-4 flex flex-col gap-4 flex-1 h-full">
        {routes.map((route, index) => (
          <Link
          href={route.route}
            key={index}
            className="flex items-center gap-2 p-3 bg-white/20 rounded-lg"
          >
            <route.Icon className="text-white text-2xl" />
            <p className="text-white font-semibold">{route.title}</p>
          </Link>
        ))}
      </div>

      <div className="w-full h-[300px] bg-white/20 rounded-lg flex items-center justify-center">
        {/* image */}
        <Image
          src={"/image.png"}
          alt="image"
          width={250}
          height={250}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default Sidebar;
