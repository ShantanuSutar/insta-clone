"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();

    if (!email || !password || !name) {
      setError("Complete all fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post("api/users", {
        username: name,
        email,
        password,
      });

      setName("");
      setEmail("");
      setPassword("");
      setError("");
      router.push("/login");
    } catch (error: any) {
      setError("User already exists");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center h-screen flex-col gap-2">
      <h1 className=" text-xl font-semibold">Register</h1>
      {error && <h2 className=" text-red-600">{error}</h2>}
      <form className=" flex gap-5 flex-col" onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=" text-black border rounded-sm px-2"
          type="text"
          placeholder="Name"
        />
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
        <button type="submit">{loading ? "Loading ..." : "Register"}</button>
      </form>
      <p className="">
        Already have an account ?{" "}
        <button onClick={() => router.push("/login")} className=" underline">
          Login
        </button>{" "}
      </p>
    </div>
  );
};

export default RegisterForm;
