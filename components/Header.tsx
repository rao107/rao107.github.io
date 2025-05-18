interface HeadersProps {
  title: string;
}

export default function Header(props: HeadersProps) {
  const { title } = props;
  return (
    <h1 className="max-sm:text-2xl sm:text-3xl xl:text-5xl font-bold">
      {title}
    </h1>
  );
}
