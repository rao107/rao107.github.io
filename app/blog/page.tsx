import Link from "next/link";
import posts from "@/utils/blogutils";
import { MainCard, NavBack, Text, Title } from "@/components";

export default function Page() {
  return (
    <MainCard>
      <div className="absolute inset-y-8 left-8">
        <Title>Blog</Title>
        <NavBack href="/">Back</NavBack>
      </div>
      <ul
        className="absolute inset-y-8 right-8 w-1/2 grid grid-cols-2 gap-2 md:gap-4 2xl:gap-8 overflow-x-clip overflow-y-scroll"
      >
        {posts.map((post, i) =>
          <li key={i}>
            <Link
              href={`blog/${post.slug}`}
              className="grid content-center bg-slate-300 mix-blend-multiply rounded-2xl text-center aspect-square text-ellipsis text-balance hyphens-auto overflow-auto transition-shadow hover:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.3)]"
            >
              <Text>
                {post.title}
              </Text>
            </Link>
          </li>
        )}
      </ul>
    </MainCard>
  );
}
