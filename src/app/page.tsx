import React from 'react'
import { Editor } from './components/Editor'
import SafeContentLoad from './components/SafeContentLoad';
import { getAllPost } from '@/actions/post.action';

import { Toaster } from "react-hot-toast";
import Navbar from './components/Navbar';
import Footer from './components/Footer';


async function page() {

  const posts = await getAllPost();

  return (
    <div>
      <Navbar />
      {
        posts.length > 0
          ?
          posts.map((post) => (
            <a href={`/post/${post.id}`} key={post.id} target="_blank">
              <SafeContentLoad header={post.header} content={post.content} id={post.id} createdAt={post.createdAt}/>
            </a>
          ))
          :
          <div className='flex flex-col justify-center items-center'>Looks like someone wiped the database, oops.</div>
      }
      <Toaster />
      <Footer/>
    </div>

  )
}

export default page;