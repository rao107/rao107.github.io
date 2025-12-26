import type { Metadata } from "next";
import "./globals.css";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function updateTheme() {
                  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                  if (systemDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                }
                updateTheme();
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
