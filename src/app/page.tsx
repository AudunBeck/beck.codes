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
    <main className="p-24 container mx-auto">
      <h1 className="text-4xl">Beck.Codes</h1>
      <p>(Hopefully) more coming</p>
      <h2 className="text-2xl mt-6">Digital Garden</h2>
      <p>My small digital garden.</p>
      <h3 className="text-lg mt-4">Notes</h3>
      <section className="grid grid-cols-2 lg:grid-cols-4">
        {notes.map((note) => (
          <Link href={note.slug} key={note.slug} className="underline">
            {note.frontmatter.title}
          </Link>
        ))}
      </section>
    </main>
  );
}
