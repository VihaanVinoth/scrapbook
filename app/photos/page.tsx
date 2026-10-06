import prisma from "@/lib/db";

export default async function PhotosPage() {
  const posts = await prisma.post.findMany({
    include: {
      photos: true,
    },
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-semibold">Photos</h1>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id}>
            <h2 className="text-xl font-medium">{post.title}</h2>

            <p className="mt-2 text-zinc-500">
              {post.photos.length} photo
              {post.photos.length === 1 ? "" : "s"}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}