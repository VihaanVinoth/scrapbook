"use client";

import type { PostType } from "@/app/post/actions";
import { useState } from "react";
import { redirect } from "next/navigation";

function PostForm({
  postBlog,
}: {
  postBlog: (post: PostType) => Promise<void>;
}) {
  const [newPost, setNewPost] = useState<PostType>({
    id: crypto.randomUUID(),
    date: new Date(),
    title: "",
    content: [""],
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await postBlog(newPost);
    redirect("/blogs/" + newPost.id);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      {newPost.content.map((paragraph, i) => (
        <textarea
          key={i}
          placeholder="Content"
          value={paragraph}
          onChange={(e) => {
            const content = [...newPost.content];
            content[i] = e.target.value;
            setNewPost({ ...newPost, content: content });
          }}
        ></textarea>
      ))}
      <button
        type="button"
        onClick={() =>
          setNewPost({ ...newPost, content: [...newPost.content, ""] })
        }
      >
        Add paragraph
      </button>
      <button type="submit">Post</button>
    </form>
  );
}

export default PostForm;