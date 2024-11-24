import Link from "next/link";
import posts from "@/utils/blogutils";
import MainCard from "@/components/main-card";

export default function Page() {
  return (
    <MainCard>
      <div className="absolute inset-y-4 left-4">
        <h1 className="text-5xl">Blog</h1>
        <Link href='/'>Back</Link>
      </div>
      <div className="absolute inset-y-4 right-4 w-1/2 grid grid-cols-2 gap-4 overflow-x-clip overflow-y-scroll">
        {posts.map((post, i) =>
          <Link key={i} href={`blog/${post.slug}`}
            className="grid content-center bg-slate-300 mix-blend-multiply rounded-2xl text-center h-32 text-ellipsis text-balance hyphens-auto overflow-auto"
          >
            {post.title}
          </Link>
        )}
      </div>
    </MainCard>
  );
}
