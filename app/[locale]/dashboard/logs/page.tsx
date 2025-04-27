"use client"
import React from 'react';
import { useGetLogsQuery } from '@/app/Redux/Slices/Auth/authApi';
import Image from 'next/image';
import LogsTable from '../../items/tables/LogsTable';
import { useTranslations } from 'next-intl';

const Page = () => {
    const {data:logs , isLoading} = useGetLogsQuery();
    const t = useTranslations();
    if (isLoading) {
        return <div className='text-lg'>{t("alerts.loading")}</div>
    }
    if ( logs?.logs.length === 0) {
        return (
          <div className="flex flex-col items-center gap-2 text-lg">
            {t("alerts.no_logs_found")}{" "}
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
