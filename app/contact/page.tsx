import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-5xl">
        proanirudhrao [at] gmail [dot] com
      </h1>
      <div className="flex justify-center">
        <Link href="/">Back</Link>
      </div>
    </div>
  );
}
