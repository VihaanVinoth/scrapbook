"use server";

import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";

export interface PostType {
  id: string;
  date: Date;
  title: string;
  content: string[];
}

export async function postBlog(post: PostType) {
  try {
    await dbConnect();
    const newPost = await Post.create(post);
    console.log(newPost);
  } catch (error) {
    console.error("Error: " + error);
  }
}