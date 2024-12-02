export default function Text({
  children,
  indent,
}: Readonly<{
  children?: React.ReactNode;
  indent?: boolean;
}>) {
  return (
    <p
      className={`leading-normal ${indent && 'indent-8'} text-xs sm:text-sm md:text-base xl:text-2xl 2xl:text-4xl`}
    >
      {children}
    </p>
  );
}