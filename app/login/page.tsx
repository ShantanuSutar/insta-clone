import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession();
  if (session) redirect("/dashboard");

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;
