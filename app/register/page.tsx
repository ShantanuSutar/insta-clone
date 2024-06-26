import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession();

  if (session) redirect("/dashboard");
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default page;
