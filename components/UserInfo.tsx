"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

const UserInfo = () => {
  const session = useSession();
  const { status } = session;

  if (status === "loading") return <div>Loading ...</div>;

  // const userId = session.data?.user?.id;
  const { email, id, username }: any = session.data?.user;
  return (
    <div className=" text-black">
      <p>Username: {username}</p>
      <p>Id: {id}</p>
      <p>email: {email}</p>
      <div className=" flex gap-5">
        <button
          className=" bg-white text-black px-4 py-2 rounded-sm hover:opacity-90"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
