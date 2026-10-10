import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import slugify from "slugify";
import EditPostForm from "@/components/EditPostForm";

type EditPostPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

async function updatePost(id: number, formData: FormData) {
    "use server";

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    const published = formData.get("published") === "on";

    const slug = slugify(title, {
        lower: true,
        strict: true,
    });

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
            <EditPostForm
                action={updatePost.bind(null, post.id)}
                title={post.title}
                image={firstPhoto?.url ?? ""}
                published={post.published}
            />
        </main>
    );
}