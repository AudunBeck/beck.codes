import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";

export type MdxDateType = `${number}-${number}-${number}`;

export type PostType = "note" | "tech";
export interface FrontmatterType {
  title: string;
  aliases: string[];
  startDate: MdxDateType;
  updated?: MdxDateType;
  growthStage: "seedling";
  type: PostType;
  topics: string[];
  description: string;
}
export const NOTES_PATH = path.join(process.cwd(), "posts", "notes");
export const TECH_PATH = path.join(process.cwd(), "posts", "tech");

export const filePaths = (type: string) =>
  fs.readdirSync(type).filter((path) => /\.mdx?$/.test(path));

export function sortPostByLastWritten<
  T extends { frontmatter: FrontmatterType },
>(posts: T[]): T[] {
  const sortedPosts = posts.toSorted((a, b) => {
    const aform = a.frontmatter.updated
      ? a.frontmatter.updated.split("/").join("")
      : a.frontmatter.startDate.split("/").join("");
    const bform = b.frontmatter.updated
      ? b.frontmatter.updated.split("/").join("")
      : b.frontmatter.startDate.split("/").join("");

    return aform < bform ? 1 : aform > bform ? -1 : 0;
  });

  return sortedPosts;
}

export function getPost(slug: string) {
  const notes = fs.readdirSync(NOTES_PATH);
  const tech = fs.readdirSync(TECH_PATH);

  let type: PostType = "note";
  if (notes.find((file) => file.includes(slug))) {
    type = "note";
  } else if (tech.find((file) => file.includes(slug))) {
    type = "tech";
  }

  let filePath: string;
  switch (type) {
    case "note":
      filePath = path.join(NOTES_PATH, `${slug}.mdx`);
      break;
    case "tech":
      filePath = path.join(TECH_PATH, `${slug}.mdx`);
      break;
  }

  let source: Buffer;
  try {
    source = fs.readFileSync(filePath);
  } catch {
    notFound();
  }
  return source;
}
