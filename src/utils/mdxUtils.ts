import fs from "node:fs";
import path from "node:path";

export type MdxDateType = `${number}-${number}-${number}`;

export interface FrontmatterType {
  title: string;
  startDate: MdxDateType;
  updated?: MdxDateType;
  growthStage: "seedling";
  type: "note";
  topics: string[];
}
export const NOTES_PATH = path.join(process.cwd(), "posts", "notes");

export const noteFilePaths = fs
  .readdirSync(NOTES_PATH)
  .filter((path) => /\.mdx?$/.test(path));

export function sortNoteByLastWritten<
  T extends { frontmatter: FrontmatterType },
>(notes: T[]): T[] {
  const sortedNotes = notes.toSorted((a, b) => {
    const aform = a.frontmatter.updated
      ? a.frontmatter.updated.split("/").join("")
      : a.frontmatter.startDate.split("/").join("");
    const bform = b.frontmatter.updated
      ? b.frontmatter.updated.split("/").join("")
      : b.frontmatter.startDate.split("/").join("");

    return aform < bform ? 1 : aform > bform ? -1 : 0;
  });

  return sortedNotes;
}
