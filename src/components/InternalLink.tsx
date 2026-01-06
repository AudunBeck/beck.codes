import Link from "next/link";

interface InternalLinkProps {
  title: string;
  description: string;
  href: string;
  children: React.ReactNode;
}

export function InternalLink({
  title,
  description,
  href,
  children,
}: InternalLinkProps) {
  return <Link href={href}>{children}</Link>;
}
