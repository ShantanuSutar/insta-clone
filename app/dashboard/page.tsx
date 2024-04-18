import Navbar from "@/components/Navbar";
import Posts from "@/components/Posts";
import UserInfo from "@/components/UserInfo";
import Users from "@/components/Users";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession();
  if (!session) redirect("/login");

  return (
    <div className=" w-full  bg-gray-50 min-h-screen text-black ">
      {/* <UserInfo /> */}
      <div className=" flex w-[70%] mx-auto  gap-10 bg-gray-50 my-10">
        <Posts />
        <Users />
      </div>
    </div>
  );
};

export default page;
