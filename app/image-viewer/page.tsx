"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function ImageViewer() {
  const searchParams = useSearchParams();
  let imagePath = searchParams.get("path");
  const filename = searchParams.get("filename");

  // Strip /public prefix if present since Next.js serves public files from root
  if (imagePath?.startsWith("/public/")) {
    imagePath = imagePath.replace("/public", "");
  }

  if (!imagePath) {
    return (
      <div className="h-screen w-screen bg-slate-900 flex items-center justify-center">
        <p className="text-slate-400">No image specified</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      <Image
        src={imagePath}
        alt={filename || "Image"}
        fill
        className="object-contain"
      />
    </div>
  );
}
