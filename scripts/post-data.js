import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const TECH_PATH = path.join(process.cwd(), "posts", "tech");
const NOTES_PATH = path.join(process.cwd(), "posts", "notes");

const bracketsExtractor = (str) => {
  if (!str) return [];
  const matcher = /((?!\])(?!\[).)+/gs;
  return str.match(matcher);
};

function getDataForLinks(fileNames, filePath) {
  return fileNames.map((fileName) => {
    const file = fs.readFileSync(path.join(filePath, fileName), "utf8");
    const { content, data } = matter(file);

    const slug = fileName.replace(/\.mdx?$/, "");
    const { title, aliases, growthStage, description } = data;

    return {
      content,
      slug,
      title,
      aliases,
      growthStage,
      description,
    };
  });
}

function getAllPostData() {
  const noteFiles = fs.readdirSync(NOTES_PATH);
  const techFiles = fs.readdirSync(TECH_PATH);

  const notesData = getDataForLinks(noteFiles, NOTES_PATH);
  const techData = getDataForLinks(techFiles, TECH_PATH);
  return [...notesData, ...techData];
}

(() => {
  const totalPostData = getAllPostData();

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
          const _matchedPostData = totalPostData.find(
            (p) => p.title === match.ids[0],
          );

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
        const _matchedPostData = totalPostData.find(
          (p) => p.title === innerPostTitle,
        );
        outerPost.inboundLinks.push({
          title: innerPostTitle,
          slug: innerPost.slug,
          growthStage: innerPost.growthStage,
          description: innerPost.description,
        });
      }
    }
  }
  fs.writeFile("links.json", JSON.stringify(posts), () =>
    console.log("links recorded"),
  );
})();
