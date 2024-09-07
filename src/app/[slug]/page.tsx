import fs from "node:fs";
import path from "node:path";
import { Dates } from "@/components/Dates";
import {
  type FrontmatterType,
  NOTES_PATH,
  type PostType,
  TECH_PATH,
  filePaths,
} from "@/utils/mdxUtils";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  // Find type of post
  const notes = fs.readdirSync(NOTES_PATH);
  const tech = fs.readdirSync(TECH_PATH);

  let type: PostType = "note";
  if (notes.find((file) => file.includes(params.slug))) {
    type = "note";
  } else if (tech.find((file) => file.includes(params.slug))) {
    type = "tech";
  }

  let filePath: string;
  switch (type) {
    case "note":
      filePath = path.join(NOTES_PATH, `${params.slug}.mdx`);
      break;
    case "tech":
      filePath = path.join(TECH_PATH, `${params.slug}.mdx`);
      break;
  }

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
      <article className="px-24 mt-8 prose md:prose-lg prose-slate dark:prose-invert">
        <header>
          <p className="text-base uppercase">{frontmatter.type}</p>
          <h1>{frontmatter.title}</h1>
          <div className="flex justify-between">
            {frontmatter.topics && <span>Time to implement topics</span>}
            <Dates
              startDate={frontmatter.startDate}
              updated={frontmatter.updated}
            />
          </div>
        </header>
        <div>{content}</div>
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
  const notePaths = getSlugParams(filePaths(NOTES_PATH));
  return notePaths;
}
