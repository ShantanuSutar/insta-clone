import { NextResponse } from "next/server";
import { prisma as client } from "@/db/db";

export async function POST(req: Request) {
  const { username, password, email } = await req.json();

  if (!username || !email || !password) {
    return NextResponse.json(
      {
        msg: "empty fields are not allowed",
      },
      {
        status: 400,
      }
    );
  }

  const user = await client.user.create({
    data: {
      username,
      email,
      password,
    },
  });

  return NextResponse.json(
    {
      user: user,
    },
    {
      status: 201,
    }
  );
}
