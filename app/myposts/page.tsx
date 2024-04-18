import MyPosts from "@/components/MyPosts";
import React from "react";
import { prisma as client } from "@/db/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function getPosts() {
  const postsWithTotalLikesAndUser = await client.post.findMany({
    include: {
      likes: true,
      author: true,
    },
  });

  const postsWithLikesCountAndUser = postsWithTotalLikesAndUser.map((post) => ({
    ...post,
    totalLikes: post.likes.length,
    authorName: post.author.username,
  }));

  return postsWithLikesCountAndUser;
}

const page = async () => {
  const session = await getServerSession();
  if (!session) redirect("/login");

  const posts = await getPosts();

  let userWithNoPosts = true;

  posts.map((post) => {
    if (post.author.email === session.user?.email) {
      userWithNoPosts = false;
    }
  });

  if (userWithNoPosts)
    return (
      <div className=" flex items-center w-full   justify-center text-2xl font-semibold mt-20 ">
        No posts yet :(
      </div>
    );

  return (
    <div className="flex w-[70%] mx-auto  gap-10 bg-gray-50 my-10">
      <div className="  w-[60%] ">
        <div className=" flex  flex-col gap-10">
          {posts.map((post) => (
            <MyPosts
              key={post.id}
              post={{ ...post, description: post.description || "" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
