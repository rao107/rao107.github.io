import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-row">
      <div className="basis-1/3 bg-slate-300">
        <h1 className="text-5xl">About</h1>
        <Link href='/'>Back</Link>
      </div>
      <div className="basis-1/3 bg-slate-500">
        <Image
          src="/pfp.jpg"
          alt="Photo of Anirudh"
          className="rounded-full"
          width={100}
          height={100}
        />
      </div>
      <div className="basis-1/3 bg-slate-700">
        <h1 className="text-5xl">About</h1>
        <Link href='/'>Back</Link>
      </div>
    </div>
  );
}
