import { prisma as client } from "@/db/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { postId, userId, text } = await req.json();

  const comment = await client.comment.create({
    data: {
      text,
      postId,
      userId,
    },
  });

  return NextResponse.json(
    {
      comment: comment,
      message: "comment posted successfully",
    },
    {
      status: 201,
    }
  );
}
