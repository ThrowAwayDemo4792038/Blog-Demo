import { getSpecificPost } from "@/actions/post.action"
import SafeContentLoad from "@/app/components/SafeContentLoad";
import { notFound } from "next/navigation";

type Params = Promise<{ postId: string }>

export default async function loadSinglePost({ params }: { params: Params }) {
    const { postId } = await params;
    const post = await getSpecificPost(postId);

    if (!post) notFound();

    return (
        <SafeContentLoad header={post.header} createdAt={post.createdAt} content={post.content} id={post.id} />
    );
}
