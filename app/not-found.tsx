import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center h-full w-full">
      <div className="flex items-center justify-center w-1/2 h-1/2 border-r-1 border-r-black">
        <h1 className="text-3xl font-bold">404</h1>
      </div>
      <div className="flex flex-col justify-between pl-4 w-1/2 h-1/2 border-l-1 border-l-black">
        <h1 className="max-sm:text-2xl text-3xl font-bold">
          Page Not Found
        </h1>
        <div className="max-sm:text-lg">
          <ul>
            <li>
              <Link href={"/"}>Back</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
