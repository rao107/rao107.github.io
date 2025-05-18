import Link from "next/link";

interface NavigationProps {
  links: {
    label: string;
    href: string;
  }[];
}

export default function Navigation(props: NavigationProps) {
  const { links } = props;
  return (
    <div className="max-sm:text-lg sm:text-lg xl:text-3xl">
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
