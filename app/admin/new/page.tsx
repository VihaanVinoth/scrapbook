// import prisma from "@/lib/db";
// import slugify from "slugify";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";
// import PostForm from "@/components/PostForm";

// async function createPost(formData: FormData) {
//     "use server";

//     const session = await auth.api.getSession({
//         headers: await headers(),
//     });

//     if (!session) {
//         redirect("/login");
//     }

//     const title = formData.get("title") as string;
//     const image = formData.get("image") as string;
//     const published = formData.get("published") === "on";

//     const slug = slugify(title, {
//         lower: true,
//         strict: true,
//     });

//     const existingPost = await prisma.post.findUnique({
//         where: {
//             slug,
//         },
//     });

//     if (existingPost) {
//         throw new Error(
//             "A post with this title already exists. Please choose another title."
//         );
//     }

//     await prisma.post.create({
//         data: {
//             title,
//             slug: finalSlug,
//             published,
//             photos: {
//                 create: {
//                     url: image,
//                     order: 0,
//                 },
//             },
//         },
//     });

//     redirect("/admin");
// }

// export default async function NewPostPage() {
//     const session = await auth.api.getSession({
//         headers: await headers(),
//     });

//     if (!session) {
//         redirect("/login");
//     }

//     return (
//         <main className="mx-auto max-w-2xl px-6 py-12">
//             <h1 className="text-4xl font-semibold">New Post</h1>

//             <PostForm action={createPost} />
//         </main>
//     );
// }