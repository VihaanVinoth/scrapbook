import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";

type EditPostPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

async function updatePost(id: number, formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const image = formData.get("image") as string;
    const published = formData.get("published") === "on";

    await prisma.post.update({
        where: {
            id,
        },
        data: {
            title,
            slug,
            published,
        },
    });

    const firstPhoto = await prisma.photo.findFirst({
        where: {
            postId: id,
        },
        orderBy: {
            order: "asc",
        },
    });

    if (firstPhoto && image) {
        await prisma.photo.update({
            where: {
                id: firstPhoto.id,
            },
            data: {
                url: image,
            },
        });
    }

    redirect("/admin");
}

export default async function EditPostPage({
    params,
}: EditPostPageProps) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }
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

    const firstPhoto = post.photos[0];

    return (
        <main className="mx-auto max-w-2xl px-6 py-12">
            <h1 className="text-4xl font-semibold">Edit Post</h1>
            <form
                action={updatePost.bind(null, post.id)}
                className="mt-10 space-y-6"
            >
                <div>
                    <label htmlFor="title" className="block font-medium">
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        defaultValue={post.title}
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
                        defaultValue={post.slug}
                        required
                        className="mt-2 w-full rounded-lg border px-3 py-2"
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
                        defaultValue={firstPhoto?.url ?? ""}
                        required
                        className="mt-2 w-full rounded-lg border px-3 py-2"
                    />
                </div>

                <label className="flex items-center gap-2">
                    <input
                        name="published"
                        type="checkbox"
                        defaultChecked={post.published}
                    />
                    Published
                </label>
                <button
                    type="submit"
                    className="rounded-lg bg-black px-5 py-2 text-white"
                >
                    Save Changes
                </button>
            </form>
        </main>
    );
}