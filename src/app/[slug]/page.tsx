import fs from "node:fs";
import path from "node:path";
import { Dates } from "@/components/Dates";
import {
  type FrontmatterType,
  NOTES_PATH,
  noteFilePaths,
} from "@/utils/mdxUtils";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const filePath = path.join(NOTES_PATH, `${params.slug}.mdx`);
  let source: Buffer;
  try {
    source = fs.readFileSync(filePath);
  } catch {
    notFound();
  }
  const { content, frontmatter } = await compileMDX<FrontmatterType>({
    source: source,
    options: { parseFrontmatter: true },
  });
  return (
    <main className="container mx-auto">
      <article className="px-24 prose md:prose-xl prose-slate dark:prose-invert">
        <h1>{frontmatter.title}</h1>
        <div className="flex justify-between">
          {frontmatter.topics && <span>Time to implement topics</span>}
          <Dates
            startDate={frontmatter.startDate}
            updated={frontmatter.startDate}
          />
        </div>
        {content}
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  const getSlugParams = (filePaths: string[]) =>
    filePaths
      // Remove the .mdx extension
      .map((path) => path.replace(/\.mdx?$/, ""))
      .map((slug) => ({ params: { slug } }));
  const notePaths = getSlugParams(noteFilePaths);
  return notePaths;
}
