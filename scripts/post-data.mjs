import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const TECH_PATH = path.join(process.cwd(), "posts", "tech");
const NOTES_PATH = path.join(process.cwd(), "posts", "notes");

const bracketsExtractor = (str) => {
  if (!str) return [];
  const matcher = /((?!\])(?!\[).)+/gs;
  return str.match(matcher);
};

async function getDataForLinks(fileNames, filePath) {
  const results = [];
  for (const fileName of fileNames) {
    const file = await fs.readFile(path.join(filePath, fileName), "utf8");
    const { content, data } = matter(file);

    const slug = fileName.replace(/\.mdx?$/, "");
    const { title, aliases, growthStage, description } = data;

    results.push({
      content,
      slug,
      title,
      aliases,
      growthStage,
      description,
    });
  }
  return results;
}

async function getAllPostData() {
  const noteFiles = await fs.readdir(NOTES_PATH);
  const techFiles = await fs.readdir(TECH_PATH);

  const notesData = await getDataForLinks(noteFiles, NOTES_PATH);
  const techData = await getDataForLinks(techFiles, TECH_PATH);
  return [...notesData, ...techData];
}

async function main() {
  try {
    const totalPostData = await getAllPostData();

    const posts = totalPostData.map(
      ({ title, aliases, slug, growthStage, description }) => ({
        ids: [title, ...(aliases ? aliases : [])],
        slug,
        growthStage,
        description,
        outboundLinks: [],
        inboundLinks: [],
      }),
    );

    for (const [index, postData] of totalPostData.entries()) {
      const { content } = postData;
      const bracketContents = bracketsExtractor(content);
      if (bracketContents) {
        for (const alias of bracketContents) {
          const match = posts.find((p) => {
            const normalisedAlias = alias
              .replace(/\n/g, "")
              .replace(/\s+/g, " ") // Replaces all whitespace exceeding one space character
              .replace(`{' '}`, " ")
              .replace(`{" "}`, " ");
            return p.ids.includes(normalisedAlias);
          });
          if (match) {
            posts[index].outboundLinks.push({
              matchedId: alias,
              title: match.ids[0],
              slug: match.slug,
              growthStage: match.growthStage,
              description: match.description,
            });
          }
        }
      }
    }

    for (const outerPost of posts) {
      const outerPostTitle = outerPost.ids[0];

      for (const innerPost of posts) {
        const innerPostTitle = innerPost.ids[0];

        if (
          innerPost.outboundLinks.some((link) => link.title === outerPostTitle)
        ) {
          outerPost.inboundLinks.push({
            title: innerPostTitle,
            slug: innerPost.slug,
            growthStage: innerPost.growthStage,
            description: innerPost.description,
          });
        }
      }
    }

    await fs.writeFile("links.json", JSON.stringify(posts, null, 2));
    console.log(`✓ Generated links.json with ${posts.length} posts`);
  } catch (error) {
    console.error("✗ Failed to generate links:", error);
    process.exit(1);
  }
}

main();
