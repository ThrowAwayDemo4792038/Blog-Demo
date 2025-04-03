"use server";

export async function getFileNameFromUrl(urls: string) {
    try {
        return urls.split(",").map((url) => `upload/${url.split("/").pop() || ""}`);
    } catch (error) {
        console.error("Invalid URL format", error);
        return null;
    }
}

