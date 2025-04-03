'use server';

import { getAllPost } from '@/actions/post.action';
import PostList from './PostList';
import { Editor } from '../components/Editor';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';


export default async function Page() {
    const posts = await getAllPost(); // Fetch data on the server
    const supabase = await createClient();
    const {data, error} = await supabase.auth.getUser();

    if (!data?.user) {
        redirect('/');
    }

    return (
        <div>
            <Editor/>
            <PostList posts={posts} />
        </div>
    )
}
