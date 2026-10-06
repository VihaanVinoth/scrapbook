import Link from "next/link";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function deletePost(formData: FormData) {
    "use server";

    const id = Number(formData.get("id"));

    const post = await prisma.post.findUnique({
        where: {
            id,
        },
    });

    if (!post) {
        return;
    }

    await prisma.post.delete({
        where: {
            id,
        },
    });
}

export default async function AdminPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    const posts = await prisma.post.findMany({
        include: {
            photos: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <main className="mx-auto max-w-6xl px-6 py-12" >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-semibold">Admin</h1>
                    <p className="mt-2 text-zinc-500">
                        Manage your photo posts.
                    </p>
                </div>
                <Link
                    href="/admin/new"
                    className="rounded-lg bg-black px-4 py-2 text-white"
                >
                    New Post
                </Link>
            </div>
            <div className="mt-12">
                {posts.length === 0 ? (
                    <p className="text-zinc-500">No posts yet.</p>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="rounded-lg border p-5"
                            >
                                <h2 className="text-xl font-medium">
                                    {post.title}
                                </h2>
                                <p className="mt-1 text-sm text-zinc-500">
                                    /photos/{post.slug}
                                </p>
                                <p className="mt-2 text-sm">
                                    {post.published ? "Published" : "Draft"} ·{" "}
                                    {post.photos.length} photo
                                    {post.photos.length === 1 ? "" : "s"}
                                </p>
                                <Link
                                    href={`/admin/${post.slug}`}
                                    className="mt-4 inline-block text-sm underline"
                                >
                                    Edit
                                </Link>
                                <form action={deletePost} className="mt-2">
                                    <input
                                        type="hidden"
                                        name="id"
                                        value={post.id}
                                    />
                                    <button
                                        type="submit"
                                        className="text-sm text-red-600 underline"
                                    >
                                        Delete
                                    </button>
                                </form>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </main >
    );
}