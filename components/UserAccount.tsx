"use client";
import { useSession } from "next-auth/react";
import React from "react";

const UserAccount = () => {
  const session = useSession();
  const { status } = session;

  if (status === "loading") return <div>Loading ...</div>;

  const { id, username }: any = session?.data?.user;

  return <span className=" font-semibold">{username}</span>;
};

export default UserAccount;
