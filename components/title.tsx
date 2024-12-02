export default function Title({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <h1
      className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl 2xl:text-9xl"
    >
      {children}
    </h1>
  );
}