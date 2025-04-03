"use server";

import { logs } from "@/mock/data";
import { redirect } from "next/navigation";
import { newchat } from "./chat.actions";

export const fetchlogs = async (start: number = 0): Promise<any> => {
  try {
    const res = logs.slice(start, start + 10);
    return {
      data: res,
      total: logs.length,
      hasNext: start + 10 < logs.length,
      hasPrev: start > 0,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchOneByTitle = async (title: string): Promise<any> => {
  try {
    const res = logs.find((log) => log.title === title);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLogsByTitle = async (
  title: string,
  start: number = 0
): Promise<any> => {
  try {
    const res = logs.filter((log) =>
      log.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())
    );
    console.log(res.length);
    const data = res.slice(start, start + 10);
    return {
      data: data,
      total: res.length,
      hasNext: start + 10 < res.length,
      hasPrev: start > 0,
    };
  } catch (error) {
    console.log(error);
  }
};

export const SearchlogsOrNet = async (question: string): Promise<any> => {
  try {
    const res = logs.filter((log) => log.title.includes(question));
    if (res) {
  
      if (res.length == 1) {
        console.log(res[0]);
        return res[0].solution;
      } else {
        return "Redirect";
      }
    } else {
      const response = await newchat(question);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
