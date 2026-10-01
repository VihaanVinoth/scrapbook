import { postBlog } from "./actions";
import { initAuth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import PostForm from "@/components/PostForm";

async function Page() {
  const auth = await initAuth();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.email !== "dalx900@gmail.com") redirect("/");

  return (
    <div>
      <h1>Create Blog</h1>
      <PostForm postBlog={postBlog} />
    </div>
  );
}

export default Page;