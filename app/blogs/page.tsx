import type { PostType } from "../post/actions";
import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";
import Link from "next/link";

async function Page() {
  await dbConnect();
  const allPosts = (await Post.find().sort({ date: -1 })) as PostType[];

  return (
    <div>
      {allPosts.length > 0 ? (
        allPosts.map((post) => (
          <Link href={`/blogs/${post.id}`} key={post.id}>
            <h2>{post.title}</h2>
            <div>{post.date.toLocaleDateString()}</div>
          </Link>
        ))
      ) : (
        <Link href="/post">No blogs yet, create one here!</Link>
      )}
    </div>
  );
}

export default Page;