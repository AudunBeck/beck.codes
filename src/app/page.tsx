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
    <main className="px-4 md:px-16">
      <h1 className="mt-8 font-semibold text-4xl md:text-6xl">Beck.Codes</h1>
      <h2 className="mt-16 text-3xl md:text-4xl">Digital Garden</h2>
      <p className="mt-1 text-lg">My small digital garden</p>
      <div className="grid md:grid-cols-4">
        <section className="md:col-span-3">
          <h3 className="mt-4 text-2xl md:text-3xl">Tech</h3>
          <div className="mt-2 grid gap-4 md:grid-cols-2">
            {sortedTech.map((tech) => (
              <div key={tech.slug}>
                <Link href={tech.slug} className="text-lg underline md:text-xl">
                  {tech.frontmatter.title}
                </Link>
              </div>
            ))}
          </div>
        </section>
        <section className="">
          <h3 className="mt-4 text-2xl md:text-3xl">Notes</h3>
          <div className="mt-2 flex flex-col gap-2">
            {sortedNotes.map((note) => (
              <div key={note.slug}>
                <Link href={note.slug} className="text-lg underline md:text-xl">
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
