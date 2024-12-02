import Image from "next/image";
import MainCard from "@/components/main-card";
import Title from "@/components/title";
import Text from "@/components/text";
import NavBack from "@/components/nav-back";

export default function Page() {
  return (
    <MainCard>
      <div className="w-full h-full">
        <div className="absolute inset-y-8 left-8 w-1/2">
          <Title>About</Title>
          <NavBack href='/'>Back</NavBack>
        </div>
        <div className="absolute inset-y-8 right-8 w-1/2 overflow-y-scroll">
          <Text>
            Hello. My name is Anirudh Rao. I work at Jiffy.ai as a software engineer. I studied computer science at Purdue University and graduated with Bachelor&rsquo;s and Master&rsquo;s degrees. In my spare time, I enjoy editing Wikipedia, creating puzzles, and spending time with friends.
          </Text>
        </div>
        <div className="absolute bottom-8 left-8 h-1/3 drop-shadow-none hover:drop-shadow-lg">
          <Image
            src="/pfp.jpg"
            alt="Photo of Anirudh"
            className="rounded-full h-full w-full saturate-0 brightness-110 contrast-200 grayscale ease-in-out duration-300 hover:saturate-100 hover:brightness-100 hover:contrast-100 hover:grayscale-0"
            width={500}
            height={500}
          />
        </div>
      </div>
    </MainCard>
  );
}
