import Image from "next/image";
import type { PostType } from "./post/actions";
import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";
import Link from "next/link";

await dbConnect();
const allPosts = (await Post.find().sort({ date: -1 })) as PostType[];

export default function Home() {

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col py-10 px-10">
        <Image
          className="dark:invert h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            scrapbook.vihaanvinoth.com
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            This is a blog of the photos I have taken over the years.
          </p>
        </div>
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
      </main>
    </div>
  );
}