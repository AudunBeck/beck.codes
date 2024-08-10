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
