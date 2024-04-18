"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Complete all fields");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (error: any) {
      setError("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center h-screen flex-col gap-2">
      <h1 className=" text-xl font-semibold">Login</h1>
      {error && <h2 className=" text-red-600">{error}</h2>}
      <form className=" flex gap-5 flex-col" onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" text-black border rounded-sm px-2"
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=" text-black border rounded-sm px-2"
          type="password"
          placeholder="Password"
        />
        <button type="submit">{loading ? "Loading ..." : "Login"}</button>
      </form>
      <p className="">
        New to Instagram ?{" "}
        <button onClick={() => router.push("/register")} className=" underline">
          Register
        </button>{" "}
      </p>
    </div>
  );
};

export default LoginForm;
