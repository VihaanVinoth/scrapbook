"use client";

import { useState } from "react";
import Image from "next/image";

type ImageUploadProps = {
    onUpload: (url: string) => void;
};

export default function ImageUpload({ onUpload }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState("");

    async function handleUpload(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setUploading(true);

        try {
            const signatureResponse = await fetch("/api/upload", {
                method: "POST",
            });

            if (!signatureResponse.ok) {
                throw new Error("Could not authenticate upload.");
            }

            const {
                timestamp,
                signature,
                cloudName,
                apiKey,
            } = await signatureResponse.json();

            const formData = new FormData();

            formData.append("file", file);
            formData.append("api_key", apiKey);
            formData.append("timestamp", timestamp);
            formData.append("signature", signature);

            const uploadResponse = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!uploadResponse.ok) {
                throw new Error("Image upload failed.");
            }

            const data = await uploadResponse.json();

            setPreview(data.secure_url);
            onUpload(data.secure_url);
        } catch (error) {
            console.error(error);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div>
            <label className="block font-medium">
                Photo
            </label>
            <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                className="mt-2 block w-full text-sm"
            />
            {uploading && (
                <p className="mt-2 text-sm text-zinc-500">
                    Uploading...
                </p>
            )}
            {preview && (
                <Image
                    src={preview}
                    alt="Uploaded photo"
                    width={1200}
                    height={800}
                    className="mt-4 h-auto w-full rounded-lg"
                />
            )}
        </div>
    );
}