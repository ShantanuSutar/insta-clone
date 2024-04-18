"use client";
import React, { SyntheticEvent, useState } from "react";
import ImageUpload from "./ImageUpload";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

const NewPost = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const session = useSession();
  const { id: authorId }: any = session?.data?.user;

  const router = useRouter();

  const handleSubmit = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();
    if (!imageUrl || !description) {
      setError("Missing image or description !");
      return;
    }
    try {
      const res = await axios.post("api/posts", {
        authorId,
        imageUrl,
        description,
      });
      console.log(res);
      router.replace("/dashboard");
    } catch (error: any) {
      console.log(error);
    } finally {
      setError("");
      setImageUrl("");
      setDescription("");
    }
  };
  return (
    <div>
      <form className=" flex flex-col gap-2" onSubmit={handleSubmit}>
        <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className=" border px-2 mt-5"
          size={30}
          type="text"
          placeholder="Description"
        />
        {error && <p className=" text-red-500">{error}</p>}
        <button className=" border-black border  mt-10" type="submit">
          Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;
