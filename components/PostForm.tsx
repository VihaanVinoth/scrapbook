"use client";

import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";

type PostFormProps = {
    action: (formData: FormData) => void | Promise<void>;
};

export default function PostForm({ action }: PostFormProps) {
    const [image, setImage] = useState("");

    return (
        <form action={action} className="mt-10 space-y-6">
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

            <ImageUpload onUpload={setImage} />

            <input
                type="hidden"
                name="image"
                value={image}
            />

            <label className="flex items-center gap-2">
                <input
                    name="published"
                    type="checkbox"
                />
                Publish immediately
            </label>

            <button
                type="submit"
                disabled={!image}
                className="rounded-lg bg-black px-5 py-2 text-white disabled:opacity-50"
            >
                Create Post
            </button>
        </form>
    );
}