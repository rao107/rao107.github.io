import { getAllFilePaths } from '@/lib/files';
import { isImageFile } from '@/lib/utils';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export function generateStaticParams() {
  const allPaths = getAllFilePaths();
  // Only generate params for image files
  return allPaths
    .filter(pathParts => {
      const fileName = pathParts[pathParts.length - 1];
      return isImageFile(fileName);
    })
    .map(pathParts => ({
      path: pathParts
    }));
}

export default async function ImageViewerPage({ params }: { params: Promise<{ path: string[] }> }) {
  const { path: pathParts } = await params;

  const fileName = pathParts[pathParts.length - 1];

  if (!isImageFile(fileName)) {
    notFound();
  }

  // Construct the image path - Next.js serves public files from root
  const imagePath = `/${pathParts.join('/')}`;

  return (
    <div className="h-screen w-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      <Image
        src={imagePath}
        alt={fileName}
        fill
        className="object-contain"
      />
    </div>
  );
}
