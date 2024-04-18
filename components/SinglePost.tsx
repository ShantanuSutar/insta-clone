"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { LuBookmark } from "react-icons/lu";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import CommentModal from "./CommentModal";
import { Post } from "./MyPosts";

interface SinglePostProps {
  key: string;
  post: Post;
}

export interface Comment {
  id: string;
  text: string;
  createdAt: Date;
  userId: string;
  postId: string;
  user: {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
  };
}

export const SinglePost = ({ post, key }: SinglePostProps) => {
  const { description, imageUrl, authorName, totalLikes } = post;

  const [showCommentModal, setShowCommentModal] = React.useState(false);

  const [comments, setComments] = useState<Comment[]>([]);

  const session = useSession();
  const { status } = session;

  const router = useRouter();

  if (status === "loading") return <div>Loading ...</div>;

  const { id }: any = session?.data?.user;

  const handleLike = async () => {
    await axios.post("/api/likes", {
      postId: post.id,
      userId: id,
    });

    router.refresh();
  };

  let liked = false;

  post.likes.map((like) => {
    if (like.userId === id && like.postId === post.id) {
      liked = true;
    }
    return;
  });

  const handleShowComments = async () => {
    await axios.get(`api/comments/${post.id}`).then((res) => {
      setComments(res.data.comments);
    });
    setShowCommentModal(true);
  };

  if (id === post.author.id) return <></>;
  return (
    <>
      {showCommentModal && (
        <div className=" fixed  z-10   bg-gray-100   w-[70%] h-[70%] flex items-center justify-center">
          <CommentModal
            imageUrl={imageUrl}
            description={description}
            authorName={authorName}
            totalLikes={totalLikes}
            comments={comments}
            userId={id}
            postId={post.id}
            handleShowComments={handleShowComments}
            setShowCommentModal={setShowCommentModal}
          />
        </div>
      )}
      <div
        className={`bg-white rounded-md border ${showCommentModal ? "" : ""}`}
      >
        <div className=" w-full flex justify-between p-4 ">
          <div className=" flex items-center justify-center gap-3">
            <RxAvatar className="  scale-150" />
            <span className=" text-sm font-semibold">{authorName}</span>
          </div>
          <div>
            <BsThreeDots />
          </div>
        </div>
        <div className=" flex bbitems-center">
          <Image
            className=" w-full h-full object-cover"
            src={imageUrl}
            alt="post"
            width={300}
            height={300}
          />
        </div>
        <div className=" px-3 py-3 flex flex-col">
          <div className=" flex justify-between items-center">
            <div className=" flex gap-3">
              <span>
                {liked ? (
                  <FaHeart
                    className=" cursor-pointer text-red-500"
                    size={20}
                    onClick={handleLike}
                  />
                ) : (
                  <FaRegHeart
                    className=" cursor-pointer "
                    onClick={handleLike}
                    size={20}
                  />
                )}
              </span>
              <FaRegComment
                className=" cursor-pointer"
                onClick={handleShowComments}
                size={20}
              />
              <LuSend size={20} />
            </div>
            <div>
              <LuBookmark size={20} />
            </div>
          </div>
          <p className=" mt-2 font-semibold">{totalLikes} likes</p>
          <p>
            <span className=" font-semibold">{authorName}</span> {description}
          </p>
        </div>
      </div>
    </>
  );
};
