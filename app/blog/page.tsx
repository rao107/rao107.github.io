import Link from "next/link";

export default function Page() {
  const test = ['hello', 'hi', 'sup', 'hey', 'whaddup', 'yo', 'pokes u'];
  return (
    <>
      <div className="absolute inset-y-4 left-4">
        <h1 className="text-5xl">Blog</h1>
        <Link href='/'>Back</Link>
      </div>
      <div className="absolute inset-y-4 right-4 w-1/2 grid grid-cols-2 gap-4 overflow-x-clip overflow-y-scroll">
        {test.map((x, i) =>
          <Link key={i} href={`blog/${x}`} className="grid content-center bg-slate-300 mix-blend-multiply rounded-2xl text-center h-32 text-ellipsis text-balance break-all overflow-auto">
            {x}
          </Link>
        )}
      </div>
    </>
  );
}
