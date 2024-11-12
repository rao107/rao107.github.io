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
        <div className="grid content-center">

        </div>
        <main className="place-self-center w-1/2 aspect-[7/4]
          bg-[url('../public/paper-texture.jpg')] bg-center bg-cover"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
