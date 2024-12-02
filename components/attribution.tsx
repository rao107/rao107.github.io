import Link from "next/link";

export default function Attribution() {
  return (
    <span 
      className="absolute inset-x-0 bottom-0 text-[12px] text-center transition text-gray-300 hover:text-black"
    >
      Made with love and JS by Anirudh Rao. Paper texture designed by <Link href="https://www.freepik.com/">Freepik</Link>.
    </span>
  );
}
