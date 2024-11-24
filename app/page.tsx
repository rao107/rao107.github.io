import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center absolute inset-0">
      <div className="w-min self-center">
        <h1 className="text-5xl">Anirudh&nbsp;Rao</h1>
        <ul className="flex justify-between">
          <Link href="about">About</Link>
          <Link href="blog">Blog</Link>
          <Link href="projects">Projects</Link>
          <Link href="mailto:proanirudhrao@gmail.com">Contact</Link>
        </ul>
      </div>
    </div>
  );
}
