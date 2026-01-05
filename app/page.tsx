import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";

export default async function Home() {
  await dbConnect();
  const posts = await Post.find({}).sort({ createdAt: -1 });

  return <div className="underline">hello</div>;
}
