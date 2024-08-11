import fs from "node:fs";
import path from "node:path";
import {
  type FrontmatterType,
  NOTES_PATH,
  noteFilePaths,
} from "@/utils/mdxUtils";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";

export default async function Home() {
  const promisNotes = noteFilePaths.map(async (filePath) => {
    const source = fs.readFileSync(path.join(NOTES_PATH, filePath));
    const { content, frontmatter } = await compileMDX<FrontmatterType>({
      source: source,
      options: { parseFrontmatter: true },
    });
    const slug = filePath.replace(/\.mdx$/, "");
    return { content, frontmatter, slug, filePath };
  });

  const notes = await Promise.all(promisNotes);
  return (
    <main className="px-16">
      <h1 className="text-4xl md:text-6xl font-semibold mt-8">Beck.Codes</h1>
      <h2 className="text-3xl md:text-4xl mt-16">Digital Garden</h2>
      <p className="text-lg mt-1">My small digital garden.</p>
      <h3 className="text-2xl md:text-3xl mt-4">Notes</h3>
      <section className="grid grid-cols-2 lg:grid-cols-4 mt-1">
        {notes.map((note) => (
          <Link
            href={note.slug}
            key={note.slug}
            className="text-lg md:text-xl underline"
          >
            {note.frontmatter.title}
          </Link>
        ))}
      </section>
    </main>
  );
}
