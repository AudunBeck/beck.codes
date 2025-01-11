import Link from "next/link";

export async function Header() {
  return (
    <nav className="flex justify-between px-4 py-8 md:px-16">
      <Link href={"/"} className="text-2xl">
        beck.codes
      </Link>
      <div className="flex gap-4 text-lg">
        <Link href={"/now"}>Now</Link>
        <Link href={"/about"}>About</Link>
      </div>
    </nav>
  );
}
