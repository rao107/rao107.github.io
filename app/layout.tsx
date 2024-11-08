import type { Metadata } from "next";
import { Bodoni_Moda } from 'next/font/google';
import "./globals.css";

const bodoni_moda = Bodoni_Moda({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Anirudh Rao",
  description: "Anirudh Rao's website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={bodoni_moda.className}>
        <main className="grid place-items-center absolute inset-0 sm:m-4 md:m-8 lg:m-16 xl:m-32
          2xl:m-64 bg-[url('../public/paper-texture.jpg')] bg-center bg-cover"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
