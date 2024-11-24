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
        <main className="grid place-items-center w-screen h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
