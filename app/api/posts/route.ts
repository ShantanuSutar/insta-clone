import { NextResponse, NextRequest } from "next/server";
import { prisma as client } from "@/db/db";

export async function POST(req: Request) {
  const { authorId, imageUrl, description } = await req.json();

  if (!imageUrl || !description) {
    return NextResponse.json(
      {
        msg: "empty fields are not allowed",
      },
      {
        status: 400,
      }
    );
  }

  const existingUser = await client.user.findUnique({
    where: {
      id: authorId,
    },
  });

  if (!existingUser) {
    return NextResponse.json(
      {
        msg: "user not found",
      },
      {
        status: 404,
      }
    );
  }

  const post = await client.post.create({
    data: {
      imageUrl,
      description,
      authorId,
    },
  });

  return NextResponse.json(
    {
      post: post,
    },
    {
      status: 201,
    }
  );
}

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
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

  return NextResponse.json(
    {
      posts: postsWithLikesCountAndUser,
    },
    {
      status: 200,
    }
  );
}
