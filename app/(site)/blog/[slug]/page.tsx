import { notFound } from "next/navigation";
import { getPost, getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;

  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <article>
        <header>
          <p>{post.date}</p>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
        </header>

        <img
          src={post.cover}
          alt=""
        />

        <div>
          <MDXRemote source={post.content} />
        </div>
      </article>
    </main>
  );
}