"use client";
import React, { SyntheticEvent, useState } from "react";
import { Comment } from "./SinglePost";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import { BsThreeDots } from "react-icons/bs";
import { comment } from "postcss";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaCross } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

interface CommentModalProps {
  imageUrl: string;
  description: string;
  authorName: string;
  totalLikes: number;
  comments: Comment[];
  userId: string;
  postId: string;
  handleShowComments: () => void;
  setShowCommentModal: (value: boolean) => void;
}

const CommentModal = ({
  imageUrl,
  description,
  authorName,
  totalLikes,
  comments,
  userId,
  postId,
  handleShowComments,
  setShowCommentModal,
}: CommentModalProps) => {
  const [text, setText] = useState("");
  const router = useRouter();

  const handleAddComment = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();

    if (!text) return;

    await axios.post("api/comments", {
      postId,
      userId,
      text,
    });

    handleShowComments();
    setText("");
    // setShowCommentModal(false);
    // router.refresh();
  };
  return (
    <div className=" border-2 w-full h-full flex text-sm">
      <div className=" min-w-[65%] min-h-full flex items-center justify-center border-r-2  ">
        <Image
          className=" min-w-full min-h-full object-cover"
          src={imageUrl}
          alt="post image"
          width={900}
          height={1000}
        />
      </div>
      <div className=" flex flex-col justify-between min-w-[35%]  ">
        <div>
          <div className=" min-w-[100%] flex  items-center justify-between  border  p-2">
            <div
              className=" flex items-center gap-3
          justify-between "
            >
              <RxAvatar size={40} />
              <span className=" font-semibold">{authorName}</span>
            </div>
            <RxCross2
              className=" cursor-pointer"
              size={30}
              onClick={() => setShowCommentModal(false)}
            />
          </div>
          <div className=" my-2 flex items-center gap-2 px-4">
            <RxAvatar size={30} />
            <div>
              <span className=" font-semibold">{authorName}</span> -{" "}
              {description}
            </div>
          </div>
          <div className=" mt-4">
            {comments.map((comment) => {
              return (
                <div
                  key={comment.id}
                  className=" my-2 flex items-center gap-2 px-4"
                >
                  <RxAvatar size={30} />
                  <div>
                    <span className=" font-semibold">
                      {comment.user.username}
                    </span>{" "}
                    {comment.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <form className=" flex" onSubmit={handleAddComment}>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              placeholder="Add a comment"
              className=" w-full px-2 py-2"
            />
            <button className=" bg-white pr-4 text-blue-400" type="submit">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
