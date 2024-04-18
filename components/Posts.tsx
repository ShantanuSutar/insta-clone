import React from "react";
import { prisma as client } from "@/db/db";
import { SinglePost } from "./SinglePost";

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

const Posts = async () => {
  const posts = await getPosts();

  return (
    <div className="  w-[60%] ">
      <div className=" flex  flex-col gap-10">
        {posts.map((post) => (
          <SinglePost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
