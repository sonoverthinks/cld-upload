import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { NextResponse } from "next/server";
import { verifySession } from "@/lib/session";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await verifySession();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // Await params since it's a promise in newer Next.js versions
    const { id } = await params;

    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const imageUrl = post.imageUrl;

    // Extract public_id from cloudinary URL
    // e.g. https://res.cloudinary.com/demo/image/upload/v1234567890/folder/image.jpg
    const urlParts = imageUrl.split('/');
    const publicIdWithFolder = urlParts.slice(urlParts.findIndex((p: string) => p === 'upload') + 2).join('/');
    const publicId = publicIdWithFolder.split('.')[0]; // remove extension

    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudinaryError) {
        console.error("Cloudinary deletion error:", cloudinaryError);
        // We still want to delete the post from our DB even if Cloudinary fails
      }
    }

    await Post.findByIdAndDelete(id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
