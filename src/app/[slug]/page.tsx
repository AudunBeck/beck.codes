import { Dates } from "@/components/Dates";
import { InternalLink } from "@/components/InternalLink";
import { doubleBracketLinks } from "@/utils/doubleBracketLinks";
import { NOTES_PATH, filePaths, getPost } from "@/utils/mdxUtils";
import matter from "gray-matter";
import type { Metadata } from "next";
import { evaluate } from "next-mdx-remote-client/rsc";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: { params: Params }): Promise<Metadata> {
  const { slug } = await params;

  const source = getPost(slug);

  const { data } = matter(source);

  return {
    title: data.title,
  };
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const source = getPost(slug);
  const { content: tempContent, data } = matter(source);
  const contentWithInternalLinks = doubleBracketLinks(tempContent, data.title);

  const { content } = await evaluate({
    source: contentWithInternalLinks,
    components: { InternalLink: InternalLink },
  });

  return (
    <main className="container mx-auto px-4 md:px-16">
      <article className="prose md:prose-lg prose-slate dark:prose-invert">
        <header>
          <p className="mt-0! text-base uppercase">{data.type}</p>
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
