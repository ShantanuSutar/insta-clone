import React from "react";
import Logo from "@/public/instagram-wordmark.svg";
import Image from "next/image";
import { TiHome } from "react-icons/ti";
import { RiMessengerLine } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import { FaRegCompass } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import LogoutBtn from "./LogoutBtn";
import Link from "next/link";
import { getServerSession } from "next-auth";

const Navbar = async () => {
  const session = await getServerSession();
  if (!session) return <></>;
  return (
    <nav className="flex justify-between border-b-2 py-2 bg-white">
      <div className="flex w-[70%] mx-auto justify-between items-center">
        <Link href={"/dashboard"}>
          <Image src={Logo} alt="Logo" width={130} />
        </Link>
        <input
          className=" border px-2 font-light bg-gray-50 text-sm py-1 rounded-sm"
          type="text"
          placeholder="Search..."
        />
        <div
          className="  flex gap-4 items-center
        "
        >
          <button>
            <TiHome size={28} />
          </button>
          <button>
            <RiMessengerLine size={28} />
          </button>
          <button>
            <CiSquarePlus size={28} />
          </button>
          <button>
            <FaRegCompass size={24} />
          </button>
          <button>
            <IoMdHeartEmpty size={28} />
          </button>
          <button>
            <RxAvatar size={28} />
          </button>
          <Link href={"/myposts"}>My Posts</Link>
          <Link href={"/create"}>New</Link>
          <LogoutBtn />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
