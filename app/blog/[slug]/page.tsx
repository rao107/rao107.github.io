import Link from "next/link";
import fs from "fs";
//import posts from "@/utils/blogutils";

export async function generateStaticParams() {
  const posts = fs.readdirSync('posts');
  return posts.map((post) => ({
    slug: post.replace('.md', ''),
  }));
}

export default async function Page({params}: {params: Promise<{ slug: string }>}) {
  const {slug} = await params;
  
  return (
    <div className="w-full h-full px-8">
      <div className="w-full h-full bg-[url('../public/paper-texture.jpg')] bg-center bg-cover">
        <p>the slug is... {slug}</p>
        <Link href='/blog'>back to blog</Link>
      </div>
    </div>
  );
}
