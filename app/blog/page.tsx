import Link from "next/link";

export default function Page() {
  return (
    <div className="columns-3">
      <div className="">
        <h1 className="text-5xl">Blog</h1>
        <Link href='/'>Back</Link>
      </div>
      <div className="">
        <h1 className="text-5xl">Blog</h1>
        <Link href='/'>Back</Link>
      </div>
      <div className="">
        <h1 className="text-5xl">Blog</h1>
        <Link href='/'>Back</Link>
      </div>
    </div>
  );
}
