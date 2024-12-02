import Link from "next/link";
import Text from "@/components/text";

export default function Page() {
  return (
    <div className="w-full h-full px-8">
      <div className="flex justify-center items-center text-center w-full h-full bg-[url('../public/paper-texture.avif')] bg-center bg-cover drop-shadow-[0_0_14px_dimgray]">
        <Text>
          not found :(
          <br />
          <Link href="/blog">back to blog</Link>
        </Text>
      </div>
    </div>
  );
}
