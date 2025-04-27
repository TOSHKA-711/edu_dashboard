"use client"
import EnrolledTable from '@/app/[locale]/items/tables/EnrolledTable';
import { useGetEnrolledUsersQuery } from '@/app/Redux/Slices/Courses/courseApi';
import { useParams } from 'next/navigation';
import React from 'react';

const Page = () => {
    const params = useParams();
    const courseId = (params.id as string) ?? "";

    const {data:users} = useGetEnrolledUsersQuery(courseId)
    
    return (
        <div>
            <EnrolledTable users={users??{status:false,message:"",data:[]}}/>
        </div>
    );
}

export default Page;
