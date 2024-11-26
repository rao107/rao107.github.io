import Link from "next/link";
import Image from "next/image";
import MainCard from "@/components/main-card";

export default function Page() {
  return (
    <MainCard>
      <div className="w-full h-full">
        <div className="absolute inset-y-4 left-4">
          <h1 className="text-5xl">About</h1>
          <Link href='/'>Back</Link>
        </div>
        <div className="absolute inset-y-4 right-4 w-1/2 overflow-y-scroll">
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius fugiat tempora voluptate suscipit sapiente. Assumenda consequuntur, nisi vero quia esse vel incidunt natus dolores sapiente nostrum? Aut pariatur repellat quam?
          </p>
          <Image
            src="/pfp.jpg"
            alt="Photo of Anirudh"
            className="rounded-full pfp saturate-0 brightness-110 contrast-200 grayscale ease-in-out duration-300 hover:saturate-100 hover:brightness-100 hover:contrast-100 hover:grayscale-0"
            width={100}
            height={100}
          />
        </div>
      </div>
    </MainCard>
  );
}
