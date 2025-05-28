import { Header } from "@/components";
import Navigation from "@/components/Navigation";

export default function Page() {
  return (
    <div className="flex flex-row items-center justify-center h-1/2 sm:h-full w-full">
      <div className="flex px-4 w-1/2 h-1/2 border-r-1 border-r-black overflow-y-auto
        max-sm:text-lg sm:text-lg xl:text-xl 2xl:text-3xl
        leading-7 xl:leading-8 2xl:leading-12"
      >
        Hello. My name is Anirudh Rao. I work at Jiffy.ai as a software engineer. I studied
        computer science at Purdue University and graduated with Bachelor&rsquo;s and
        Master&rsquo;s degrees. In my spare time, I enjoy editing Wikipedia, creating puzzles, and
        spending time with friends.
      </div>
      <div className="flex flex-col justify-between pl-4 w-1/2 h-1/2 border-l-1 border-l-black">
        <Header title="About" />
        <Navigation links={
          [
            { label: "Back", href: "/" },
          ]
        } />
      </div>
    </div>
  );
}
