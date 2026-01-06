import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import ImageCard from "@/components/ImageCard";
import { IPost } from "@/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  await dbConnect();
  // Fetch and convert to plain objects for the client
  const rawPosts = await Post.find({}).sort({ createdAt: -1 });
  const posts: IPost[] = JSON.parse(JSON.stringify(rawPosts));

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
        {posts.map((post, i) => (
          <ImageCard
            key={post._id}
            post={post}
            isLarge={i % 6 === 0} // Custom bento pattern
          />
        ))}
      </div>
    </main>
  );
}
