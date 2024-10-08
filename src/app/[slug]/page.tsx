import { Dates } from "@/components/Dates";
import { InternalLink } from "@/components/InternalLink";
import { doubleBracketLinks } from "@/utils/doubleBracketLinks";
import {
  type FrontmatterType,
  NOTES_PATH,
  filePaths,
  getPost,
} from "@/utils/mdxUtils";
import matter from "gray-matter";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  const source = getPost(slug);

  const { data } = matter(source);

  return {
    title: data.title,
  };
}

export default async function Page({ params }: Props) {
  const source = getPost(params.slug);
  const { content: tempContent, data } = matter(source);
  const contentWithInternalLinks = doubleBracketLinks(tempContent, data.title);

  const { content } = await compileMDX({
    source: contentWithInternalLinks,
    components: { InternalLink: InternalLink },
  });

  return (
    <main className="container mx-auto">
      <article className="px-4 md:px-16 mt-8 prose md:prose-lg prose-slate dark:prose-invert">
        <header>
          <p className="text-base uppercase">{data.type}</p>
          <h1>{data.title}</h1>
          <div className="flex justify-between">
            {data.topics && <span>Time to implement topics</span>}
            <Dates startDate={data.startDate} updated={data.updated} />
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
