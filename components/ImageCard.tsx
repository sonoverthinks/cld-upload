"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import { IPost } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ImageCardProps {
  post: IPost;
  isLarge: boolean;
  isAdmin?: boolean;
}

export default function ImageCard({ post, isLarge, isAdmin }: ImageCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(post.imageUrl);
    toast.success("URL copied!");
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDeleting) return;

    if (!confirm("Are you sure you want to delete this image?")) return;

    setIsDeleting(true);
    const toastId = toast.loading("Deleting image...");

    try {
      const res = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete post");
      }

      toast.success("Image deleted", { id: toastId });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete image", { id: toastId });
      setIsDeleting(false);
    }
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
      {isAdmin && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          title="Delete image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
        </button>
      )}
    </div>
  );
}
