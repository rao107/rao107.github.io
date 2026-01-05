import Link from 'next/link';
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts';
import PageHeader from '../components/PageHeader';

export default function BlogIndex() {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .sort((a, b) => {
      const dateA = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
      const dateB = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
      return dateB - dateA; // Sort newest first
    });

  return (
    <div className="h-screen w-screen bg-white dark:bg-slate-900 overflow-hidden flex flex-col">
      <PageHeader
        title="Blog"
        description="Usually stuff I can't stop talking about with anyone who'll listen."
      />

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="space-y-4 w-full">
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-slate-50 dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
            >
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                {post.frontmatter.title || post.slug}
              </h2>
              {post.frontmatter.date && (
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              )}
              {post.frontmatter.description && (
                <p className="text-slate-700 dark:text-slate-300 mt-2">
                  {post.frontmatter.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
