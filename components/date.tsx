import { Dayjs } from "dayjs";

export default function Date({
  date
}: Readonly<{
  date: Dayjs
}>) {
  return (
    <h2
      className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-5xl 2xl:text-5xl"
    >
      {date.format("MMMM D, YYYY")}
    </h2>
  );
}
