import Link from "next/link";
import Image from "next/image";
import MainCard from "@/components/main-card";

export default function Page() {
  return (
    <MainCard>
      <div className="w-full h-full">
        <div className="absolute inset-y-4 left-4 h-full">
          <h1 className="text-5xl">About</h1>
          <Link href='/'>Back</Link>
        </div>
        <div className="absolute right-0 w-1/2 h-full overflow-y-auto">
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius fugiat tempora voluptate suscipit sapiente. Assumenda consequuntur, nisi vero quia esse vel incidunt natus dolores sapiente nostrum? Aut pariatur repellat quam?
          </p>
          <Image
            src="/pfp.jpg"
            alt="Photo of Anirudh"
            className="rounded-full pfp"
            width={100}
            height={100}
          />
        </div>
      </div>
    </MainCard>
  );
}
