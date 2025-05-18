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
        <div className="flex items-center justify-center min-h-screen bg-neutral-200
        dark:bg-neutral-900"
        >
          <div
            className="flex flex-row items-center justify-center m-4
            max-sm:h-[calc(100vh-32px)] max-sm:w-[calc(100vw-32px)]
            sm:w-3/4 lg:w-1/2 aspect-7/4 bg-neutral-300
            dark:bg-neutral-800 shadow-lg rounded-xl overflow-clip"
          >
            <div
              className="w-full h-full bg-[url('../public/cardboard.png')] bg-center bg-cover
              dark:invert"
            >
              <div className="w-full h-full dark:invert dark:text-neutral-300">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
