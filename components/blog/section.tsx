export default function Section({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-5xl 2xl:text-5xl">
      {children}
    </h1>
  );
}
