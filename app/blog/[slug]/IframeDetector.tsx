'use client';

import { useEffect, useState } from 'react';

export default function IframeDetector({ slug }: { slug: string }) {
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    setIsInIframe(window.self !== window.top);
  }, []);

  if (!isInIframe) return null;

  return (
    <a
      href={`/blog/${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
    >
      Open in new tab ↗
    </a>
  );
}
