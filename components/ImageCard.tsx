"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import { IPost } from "@/types";

interface ImageCardProps {
  post: IPost;
  isLarge: boolean;
}

export default function ImageCard({ post, isLarge }: ImageCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(post.imageUrl);
    toast.success("URL copied!");
  };

  return (
    <div
      onClick={handleCopy}
      className={`relative group overflow-hidden rounded-lg bg-gray-50 cursor-pointer 
        ${isLarge ? "md:col-span-2 md:row-span-2" : "col-span-1"}`}
    >
      <Image
        src={post.imageUrl}
        alt={post.imageUrl}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
        <p className="text-white text-xs font-mono truncate">{post.imageUrl}</p>
        <p className="text-gray-300 text-[10px] uppercase mt-1">
          Click to copy
        </p>
      </div>
    </div>
  );
}
