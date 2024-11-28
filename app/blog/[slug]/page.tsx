import Link from "next/link";
import Markdown from 'markdown-to-jsx';
import posts from "@/utils/blogutils";
import NotFound from './not-found';
import Image from "next/image";

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const {slug} = await params;
  const post = posts.find((value) => value.slug === slug);
  if (!post) {
    return NotFound();
  }
  return (
    <div className="w-full h-full px-8">
      <div className="w-full h-full bg-[url('../public/paper-texture.jpg')] bg-center bg-cover p-12 space-y-8 drop-shadow-[0_0_14px_dimgray]">
        <div className="space-y-2">
          <h1 className="text-5xl">{post.title}</h1>
          <h2 className="text-3xl">{post.date.format('MMMM D, YYYY')}</h2>
          <Link href='/blog' className="">back to blog</Link>
        </div>
        <Markdown
          className="*:indent-8 space-y-2 leading-relaxed font-sans"
          options={{
            overrides: {
              a: {
                component: Link,
                props: {
                  className: "text-blue-500"
                },
              },
              img: {
                component: Image,
                props: {
                  width: 500,
                  height: 500,
                  className: "w-1/2",
                },
              },
            },
          }}
        >
          {post.content}
        </Markdown>
      </div>
    </div>
  );
}
