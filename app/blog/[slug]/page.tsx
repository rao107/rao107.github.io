import { getAllPostSlugs, getPostBySlug, getPostHtml } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import IframeDetector from './IframeDetector';
import './styles.css';
import 'katex/dist/katex.min.css';

export function generateStaticParams() {
  return getAllPostSlugs().map(slug => ({ slug }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const post = getPostBySlug(slug);
    const contentHtml = await getPostHtml(post.content);

    return (
      <div className="h-screen w-screen bg-white dark:bg-slate-900 overflow-y-auto">
        <div className="px-8 py-6 max-w-4xl mx-auto w-full">
          <div className="flex justify-between items-start mb-4">
            <Link
              href="/blog"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              ← Back to Blog
            </Link>
            <IframeDetector slug={slug} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            {post.frontmatter.title}
          </h1>
          {post.frontmatter.description && (
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
              {post.frontmatter.description}
            </p>
          )}
          {post.frontmatter.date && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          )}

          <article
            className="max-w-3xl blog-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
