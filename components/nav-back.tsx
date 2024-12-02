import Link from "next/link";

export default function NavBack({
  href,
  children,
}: Readonly<{
  href: string;
  children?: React.ReactNode;
}>) {
  return (
    <Link
      href={href}
      className="text-sm sm:text-base lg:text-lg xl:text-2xl 2xl:text-4xl"
    >
      {children}
    </Link>
  );
}
