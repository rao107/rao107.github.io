import Link from "next/link";

export default function Page() {
  const test = ['hello', 'hi', 'sup'];
  return (
    <div className="">
      <div className="absolute inset-y-4 left-4">
        <h1 className="text-5xl">Projects</h1>
        <Link href='/'>Back</Link>
      </div>
      <div className="absolute right-4 w-1/2">
        {test.map((x, i) => <div key={i}>{x}</div>)}
      </div>
    </div>
  );
}
