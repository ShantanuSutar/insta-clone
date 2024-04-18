import React from "react";
import { RxAvatar } from "react-icons/rx";
import { prisma as client } from "@/db/db";
import { getServerSession } from "next-auth";
import UserAccount from "./UserAccount";

async function getUsers() {
  const users = await client.user.findMany();
  return users;
}

const Users = async () => {
  const users = await getUsers();
  const session = await getServerSession();

  return (
    <div className="  w-[40%] p-2 flex flex-col gap-3">
      <div className=" flex justify-between">
        <div className=" flex  items-center gap-3">
          <RxAvatar size={50} />
          <UserAccount />{" "}
        </div>
        <button className=" font-semibold text-blue-500">Switch</button>
      </div>
      <p className=" flex = justify-between">
        <span className=" text-gray-500 font-semibold">
          Suggestions for you
        </span>{" "}
        <span>See All</span>
      </p>
      <div className=" flex flex-col gap-2 mt-2">
        {users.map((user) => {
          if (session?.user?.email === user.email) return <></>;
          return (
            <div key={user.id}>
              <div className=" flex justify-between items-center">
                <div className=" flex items-center gap-3">
                  <RxAvatar size={35} />
                  <span className=" font-semibold">{user.username}</span>
                </div>
                <button className=" font-semibold text-blue-500">Follow</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
