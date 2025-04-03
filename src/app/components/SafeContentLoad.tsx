"use client"

import { deletePost } from "@/actions/post.action";
import { Courier_Prime, Merriweather } from "next/font/google";
import { format, startOfMonth } from 'date-fns';

interface Props {
  header: string,
  content: string,
  createdAt: Date,
  id: string,
}

const merriweather = Merriweather({
    subsets: ['latin'],
    weight: ['400'],
    style: ['normal'],
});

const courierPrime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
});

function formatDate(dateString : Date) {
  const date = new Date(dateString);
  const firstOfMonth = startOfMonth(date);
  return format(firstOfMonth, 'MMMM, 1, yyyy');
}

export default function SafeContentLoad({ header, content, createdAt, id }: Props) {

  const handleDelete = async () => {
    await deletePost(id);
  }

  return (
    <div className="flex flex-col items-center justify-center my-2">
      <div className="flex flex-col items-center min-w-[50%] xl:max-w-[60%]">
        <h1 className={`prose text-6xl text-center ${merriweather.className}`}>{header.toUpperCase()}</h1>
        <p className="py-5 text-sm">{`Posted on ${formatDate(createdAt)}`}</p>
        <article className={`prose flex flex-col min-w-[50%] xl:min-w-[60%] ${courierPrime.className}`} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  )

  /*
  return (
    <div className="flex items-center justify-center">
      <article className="max-w-[50%] lg:max-w-[30%]" dangerouslySetInnerHTML={{ __html: content }} onClick={handleDelete} />
    </div>
  )
    */
};