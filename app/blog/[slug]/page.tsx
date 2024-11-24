import Link from "next/link";
//import fs from "fs";

/*
export async function generateStaticParams() {
  const posts = fs.readdirSync('/posts');
  console.log(posts);

  return posts.map((post) => {
    slug: post,
  });
}
*/

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const {slug} = await params;
  return (
    <div>
      <p>the slug is... {slug}</p>
      <Link href='/blog'>back to blog</Link>
    </div>
  );
}
