import { prisma as client } from "@/db/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { postId, userId } = await req.json();

  const existingLike = await client.like.findFirst({
    where: {
      postId: postId.toString(),
      userId: userId.toString(),
    },
  });

  if (existingLike) {
    await client.like.delete({
      where: {
        id: existingLike.id,
      },
    });

    return NextResponse.json(
      {
        msg: " post unliked",
      },
      {
        status: 201,
      }
    );
  }

  const like = await client.like.create({
    data: {
      postId,
      userId,
    },
  });

  return NextResponse.json(
    {
      like: like,
      message: "post liked",
    },
    {
      status: 201,
    }
  );
}
