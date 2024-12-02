import Link from "next/link";
import Image from "next/image";
import { Noto_Serif } from "next/font/google";
import Markdown from 'markdown-to-jsx';
import { Date, NavBack, Text, Title } from "@/components";
import posts from "@/utils/blogutils";
import NotFound from './not-found';
import Section from "@/components/blog/section";

const font = Noto_Serif({ weight: "400", subsets: ['latin']});

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
    <div className="w-full h-full px-0 sm:px-8">
      <div className="w-full h-full bg-[url('../public/paper-texture.avif')] bg-center bg-cover py-12 px-4 sm:px-8 space-y-8 drop-shadow-[0_0_14px_dimgray]">
        <div className="space-y-2">
          <Title>{post.title}</Title>
          <Date date={post.date} />
          <NavBack href="/blog">back to blog</NavBack>
        </div>
        <Markdown
          className={`space-y-2 leading-relaxed ${font.className}`}
          options={{
            overrides: {
              a: {
                component: Link,
                props: {
                  className: "text-blue-500 underline decoration-1"
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
              h1: {
                component: Section,
              },
              p: {
                component: Text,
                props: {
                  indent: true,
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
