import Image from "next/image";
import { Header } from "@/components";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center h-full w-full">
      <div className="flex items-center justify-center w-1/2 h-1/2 border-r-1 border-r-black">
        <Image
          src="/pfp.jpg"
          alt="Photo of Anirudh (me)"
          className="rounded-full aspect-square w-1/2"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-col justify-between pl-4 w-1/2 h-1/2 border-l-1 border-l-black">
        <Header title="Anirudh Rao" />
        <Navigation links={
          [
            { label: "About", href: "/about" },
            { label: "Github", href: "https://github.com/rao107" },
            { label: "Contact", href: "mailto:proanirudhrao@gmail.com" },
          ]
        } />
      </div>
    </div>
  );
}
