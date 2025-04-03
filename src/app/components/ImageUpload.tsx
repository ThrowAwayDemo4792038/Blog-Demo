"use client";

import { imageUpload } from "@/actions/post.action";
import { useState } from "react";
import toast from "react-hot-toast";

interface UploadFormProps {
    addImageToParentList: (url: string) => void;
}

export default function UploadForm({ addImageToParentList }: UploadFormProps) {
    const [showForm, setShowForm] = useState(false);

    async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setShowForm(!showForm);

        const formData = new FormData(event.currentTarget);
        const response = await imageUpload(formData);

        if (!response) return null;

        if (response.success) {
            addImageToParentList(response.url!);
            //event.currentTarget.reset();
            toast.success("Image uploaded!");

            // this is to debug
            //setImageUrl(response.url!);
        } else {
            toast.error("Image upload failed.");
        }
    }

    return (
        <div>
            <button onClick={() => setShowForm(!showForm)}>Upload Images</button>

            {showForm ? (
                <form onSubmit={handleUpload}>
                    <input type="file" name="file" accept="image/*" required />
                    <button type="submit">Upload</button>
                </form>
            ) : null
            }
        </div>
    );
}
