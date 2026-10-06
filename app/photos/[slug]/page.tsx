import prisma from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";

type PhotoPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
    include: {
      photos: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-semibold">{post.title}</h1>

      <div className="mt-10 grid gap-6">
        {post.photos.map((photo) => (
          <Image
            key={photo.id}
            src={photo.url}
            alt={post.title}
            width={1200}
            height={800}
            className="h-auto w-full"
          />
        ))}
      </div>
    </main>
  );
}