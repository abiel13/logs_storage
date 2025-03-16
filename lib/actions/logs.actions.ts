// 'use server';

import { logs } from "@/mock/data";




export const fetchlogs =  (start:number = 0 ):any => {

    try {
        const res =  logs.slice(start, start + 10)
        return {
            data: res,
            total: logs.length,
            hasNext: start + 10 < logs.length,
            hasPrev: start > 0
        }
    } catch (error) {
        console.log(error)
    }
}