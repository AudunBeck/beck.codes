import fs from "node:fs";
import path from "node:path";
import {
  type FrontmatterType,
  NOTES_PATH,
  TECH_PATH,
  filePaths,
  sortPostByLastWritten,
} from "@/utils/mdxUtils";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";

export default async function Home() {
  const promiseNotes = filePaths(NOTES_PATH).map(async (filePath) => {
    const source = fs.readFileSync(path.join(NOTES_PATH, filePath));
    const { content, frontmatter } = await compileMDX<FrontmatterType>({
      source: source,
      options: { parseFrontmatter: true },
    });
    const slug = filePath.replace(/\.mdx$/, "");
    return { content, frontmatter, slug, filePath };
  });
  const promiseTech = filePaths(TECH_PATH).map(async (filePath) => {
    const source = fs.readFileSync(path.join(TECH_PATH, filePath));
    const { content, frontmatter } = await compileMDX<FrontmatterType>({
      source: source,
      options: { parseFrontmatter: true },
    });
    const slug = filePath.replace(/\.mdx$/, "");
    return { content, frontmatter, slug, filePath };
  });

  const notes = await Promise.all(promiseNotes);
  const sortedNotes = sortPostByLastWritten(notes);
  const tech = await Promise.all(promiseTech);
  const sortedTech = sortPostByLastWritten(tech);
  return (
    <main className="px-16">
      <h1 className="text-4xl md:text-6xl font-semibold mt-8">Beck.Codes</h1>
      <h2 className="text-3xl md:text-4xl mt-16">Digital Garden</h2>
      <p className="text-lg mt-1">My small digital garden.</p>
      <div className="grid md:grid-cols-4">
        <section className="md:col-span-3">
          <h3 className="text-2xl md:text-3xl mt-4">Tech</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            {sortedTech.map((tech) => (
              <div key={tech.slug}>
                <Link href={tech.slug} className="text-lg md:text-xl underline">
                  {tech.frontmatter.title}
                </Link>
              </div>
            ))}
          </div>
        </section>
        <section className="">
          <h3 className="text-2xl md:text-3xl mt-4">Notes</h3>
          <div className="flex flex-col gap-2 mt-2">
            {sortedNotes.map((note) => (
              <div key={note.slug}>
                <Link href={note.slug} className="text-lg md:text-xl underline">
                  {note.frontmatter.title}
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
