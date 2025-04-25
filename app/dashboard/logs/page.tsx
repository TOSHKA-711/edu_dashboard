"use client"
import React from 'react';
import LogsTable from '@/app/items/tables/LogsTable';
import { useGetLogsQuery } from '@/app/Redux/Slices/Auth/authApi';
import Image from 'next/image';

const Page = () => {
    const {data:logs , isLoading} = useGetLogsQuery();
    if (isLoading) {
        return <div className='text-lg'>... Loading</div>
    }
    if ( logs?.logs.length === 0) {
        return (
          <div className="flex flex-col items-center gap-2 text-lg">
            No Logs found{" "}
            <Image
              src={"/404 Error-rafiki.svg"}
              alt="not found"
              width={250}
              height={100}
            />{" "}
          </div>
        );
      }
    return (
        <div>
            <LogsTable logs={logs?.logs??[]}/>
        </div>
    );
}

export default Page;
