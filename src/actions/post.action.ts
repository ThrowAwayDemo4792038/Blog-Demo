"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { getFileNameFromUrl } from "./helpers.action";

const BLOG_DEMO_BUCKET: string = "blog-demo-bucket";

export async function getAllPost() {

    try {
        const getAllPost = await prisma.posts.findMany({
            orderBy: {
                createdAt: "desc",
            },
            select: {
                createdAt: true,
                header: true,
                id: true,
                content: true,
            }
        });

        return getAllPost;
    } catch (error) {
        console.log("Error.", error)
        return [];
    }

}

export async function getSpecificPost(id: string) {

    try {
        const getOnePost = await prisma.posts.findUnique({
            where: {
                id,
            }
        });

        return getOnePost;
    } catch (error) {
        console.log("Error.", error)
        throw new Error("Post not found");
    }

}

export async function createPost(header: string, content: string, images: string) {
    try {

        const uploadPost = await prisma.posts.create({
            data: {
                header,
                content,
                images,
            },
        });

        revalidatePath('/');
        return { success: true, uploadPost };
    } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Failed to create post");
    }
}

export async function deleteImageWithUrl(url: string) {
    const imagePaths = await getFileNameFromUrl(url) || [];

    console.log(url);
    console.log('there should be file path ontop')
    if (imagePaths.length > 0) {
        // Delete images from the buckets
        const { data, error } = await supabase.storage
            .from(BLOG_DEMO_BUCKET)
            .remove(imagePaths);

        if (error) {
            console.error("Failed to delete images from storage:", error);
            throw new Error("Image deletion failed");
        }
    }
}

export async function deletePost(id: string) {
    try {
        // Fetch the post and ensure it exists
        const getPost = await prisma.posts.findUniqueOrThrow({ where: { id } });

        // Extract image file names if images exist
        if (getPost.images) {
            const imagePaths = await getFileNameFromUrl(getPost.images) || [];
            console.log(imagePaths);

            if (imagePaths.length > 0) {
                // Delete images from the buckets
                const { data, error } = await supabase.storage
                    .from(BLOG_DEMO_BUCKET)
                    .remove(imagePaths);

                if (error) {
                    console.error("Failed to delete images from storage:", error);
                    throw new Error("Image deletion failed");
                }


            }
        }

        // Delete the post from the database
        await prisma.posts.delete({ where: { id } });

        // Revalidate cache/path to reflect changes
        revalidatePath('/');

    } catch (error) {
        console.error("Error deleting post:", error);
        throw new Error("Failed to delete post");
    }
}


export async function imageUpload(formData: FormData) {
    try {
        // Cast as File or Null
        const file = formData.get("file") as File | null;

        // If file doesnt contain any thing, exit
        if (!file) return null;

        const bytes = await file?.arrayBuffer();
        const buffer = new Uint8Array(bytes);

        // Unique UUID to avoid conflicts
        const filePath = `upload/${uuidv4()}${file.name}`;

        const { data, error } = await supabase.storage
            .from(BLOG_DEMO_BUCKET)
            .upload(filePath, buffer, {
                // upsert allows for repeated image files
                upsert: false,
                contentType: file.type,
            });

        if (error) {
            console.log("There has been an error uploading images.", error);
            return { success: false, error: "Failed to upload images" }
        };

        const { data: publicUrlData } = supabase.storage
            .from(BLOG_DEMO_BUCKET)
            .getPublicUrl(filePath);

        return { success: true, url: publicUrlData.publicUrl };

    }
    catch (error) {
        console.error("Upload Error:", error);
        return { error: "Something went wrong", url: "" };
    }
}


