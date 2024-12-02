import { MainCard } from "@/components";
import Link from "next/link";

export default function Home() {
  return (
    <MainCard>
      <div className="flex flex-col justify-center absolute inset-0">
        <div className="w-min self-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-8xl 2xl:text-9xl">Anirudh&nbsp;Rao</h1>
          <ul className="flex justify-between *:text-xs sm:*:text-sm md:*:text-sm lg:*:text-xl xl:*:text-4xl 2xl:*:text-5xl">
            <li><Link href="about">About</Link></li>
            <li><Link href="blog">Blog</Link></li>
            <li><Link href="https://github.com/rao107">Github</Link></li>
            <li><Link href="mailto:proanirudhrao@gmail.com">Contact</Link></li>
          </ul>
        </div>
      </div>
    </MainCard>
  );
}
