import prisma from "@/lib/db";
import { redirect } from "next/navigation";

async function createPost(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const image = formData.get("image") as string;
  const published = formData.get("published") === "on";

  await prisma.post.create({
    data: {
      title,
      slug,
      published,
      photos: {
        create: {
          url: image,
          order: 0,
        },
      },
    },
  });

  redirect("/admin");
}

export default function NewPostPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-4xl font-semibold">New Post</h1>
      <form action={createPost} className="mt-10 space-y-6">
        <div>
          <label htmlFor="title" className="block font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="mt-2 w-full rounded-lg border px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block font-medium">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            className="mt-2 w-full rounded-lg border px-3 py-2"
            placeholder="melbourne-streets"
          />
        </div>
        <div>
          <label htmlFor="image" className="block font-medium">
            Photo URL
          </label>

          <input
            id="image"
            name="image"
            type="text"
            required
            className="mt-2 w-full rounded-lg border px-3 py-2"
            placeholder="/test-photo.jpg"
          />
        </div>
        <label className="flex items-center gap-2">
          <input
            name="published"
            type="checkbox"
          />
          Publish immediately
        </label>
        <button
          type="submit"
          className="rounded-lg bg-black px-5 py-2 text-white"
        >
          Create Post
        </button>
      </form>
    </main>
  );
}