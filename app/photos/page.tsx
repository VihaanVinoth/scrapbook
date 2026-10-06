import prisma from "@/lib/db";
import PhotoCard from "@/components/PhotoCard";

export default async function PhotosPage() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      photos: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-semibold">Photos</h1>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const firstPhoto = post.photos[0];

          if (!firstPhoto) return null;

          return (
            <PhotoCard
              key={post.id}
              title={post.title}
              camera="Canon EOS 7D"
              image={firstPhoto.url}
              slug={post.slug}
            />
          );
        })}
      </div>
    </main>
  );
}