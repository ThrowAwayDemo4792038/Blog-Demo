'use client';

import { deletePost } from '@/actions/post.action';
import SafeContentLoad from '../components/SafeContentLoad';
import { Posts } from '@prisma/client';

interface Post {
    header: string;
    content: string;
    id: string;
    createdAt: Date;
}

export default function PostList({ posts }: { posts: Post[] }) {
    const handleDelete = async (id: string) => {
        await deletePost(id);
    };

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} onClick={() => handleDelete(post.id)}>
                    <SafeContentLoad header={post.header} createdAt={post.createdAt} content={post.content} id={post.id} />
                </div>
            ))}
        </div>
    );
}
