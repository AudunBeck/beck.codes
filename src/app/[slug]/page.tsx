import { Dates } from "@/components/Dates";
import {
  type FrontmatterType,
  NOTES_PATH,
  filePaths,
  getPost,
} from "@/utils/mdxUtils";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  const source = getPost(slug);

  const { frontmatter } = await compileMDX<FrontmatterType>({
    source: source,
    options: { parseFrontmatter: true },
  });

  return {
    title: frontmatter.title,
  };
}

export default async function Page({ params }: Props) {
  const source = getPost(params.slug);
  const { content, frontmatter } = await compileMDX<FrontmatterType>({
    source: source,
    options: { parseFrontmatter: true },
  });

  return (
    <main className="container mx-auto">
      <article className="px-4 md:px-16 mt-8 prose md:prose-lg prose-slate dark:prose-invert">
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
