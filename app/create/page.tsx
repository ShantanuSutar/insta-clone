import ImageUpload from "@/components/ImageUpload";
import NewPost from "@/components/NewPost";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession();
  if (!session) redirect("/login");

  return (
    <div className=" flex items-center justify-center mt-28 flex-col gap-3">
      <h1 className=" text-2xl">New post</h1>
      <NewPost />
    </div>
  );
};

export default page;
