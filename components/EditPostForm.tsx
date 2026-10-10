"use client";

import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import Image from "next/image";

type EditPostFormProps = {
    action: (formData: FormData) => void | Promise<void>;
    title: string;
    image: string;
    published: boolean;
};

export default function EditPostForm({
    action,
    title,
    image: initialImage,
    published,
}: EditPostFormProps) {
    const [image, setImage] = useState(initialImage);

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
                    defaultValue={title}
                    required
                    className="mt-2 w-full rounded-lg border px-3 py-2"
                />
            </div>

            <div>
                <p className="font-medium">Current photo</p>

                {image && (
                    <Image
                        src={image}
                        alt={title}
                        width={1200}
                        height={800}
                        className="mt-3 h-auto w-full rounded-lg"
                    />
                )}
            </div>

            <ImageUpload onUpload={setImage} />

            <input type="hidden" name="image" value={image} />

            <label className="flex items-center gap-2">
                <input
                    name="published"
                    type="checkbox"
                    defaultChecked={published}
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
    );
}