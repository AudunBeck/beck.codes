import Link from "next/link";

export async function Header() {
  return (
    <nav className="flex justify-between px-16 py-8">
      <Link href={"/"} className="text-2xl">
        beck.codes
      </Link>
    </nav>
  );
}
