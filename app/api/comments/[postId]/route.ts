import { NextResponse } from "next/server";
import { prisma as client } from "@/db/db";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;

  if (!postId) {
    return NextResponse.json(
      {
        msg: "postId is required",
      },
      {
        status: 400,
      }
    );
  }

  const post = await client.post.findUnique({
    where: {
      id: postId.toString(),
    },
  });

  if (!post) {
    return NextResponse.json(
      {
        msg: "Post not found",
      },
      {
        status: 404,
      }
    );
  }
  const comments = await client.comment.findMany({
    where: {
      postId: String(postId),
    },
    include: {
      user: true,
    },
  });
  return NextResponse.json(
    {
      comments,
    },
    {
      status: 200,
    }
  );
}
