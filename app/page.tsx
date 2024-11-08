import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-5xl bg-clip-text bg-[#666666] text-transparent"
        style={{textShadow: 'rgba(245,245,245,0.5) 3px 5px 1px'}}  
      >
        Anirudh Rao
      </h1>
      <ul className="flex justify-between">
        <Link href="about">About</Link>
        <Link href="blog">Blog</Link>
        <Link href="https://github.com/rao107">Github</Link>
        <Link href="mailto:proanirudhrao@gmail.com">Contact</Link>
      </ul>
    </div>
  );
}
