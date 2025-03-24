import fs from "node:fs";
import path from "node:path";
import type { FrontmatterType } from "@/utils/mdxUtils";
import { evaluate } from "next-mdx-remote-client/rsc";

export default async function AboutPage() {
  const nowPath = path.join(process.cwd(), "src/app/now/now.mdx");
  const source = fs.readFileSync(nowPath);
  // @ts-ignore
  const { content } = await evaluate<FrontmatterType>({
    source: source,
    options: { parseFrontmatter: true },
  });
  return (
    <div className="container mx-auto px-4 md:px-16">
      <header>
        <h1 className="mt-8 mb-6 font-semibold text-4xl md:text-6xl">Now</h1>
        <h2 className="text-2xl md:text-3xl">
          A log of what I have been making, reading and thinking about.
        </h2>
      </header>
      <main className="prose md:prose-lg prose-slate dark:prose-invert mt-8">
        {content}
      </main>
    </div>
  );
}
