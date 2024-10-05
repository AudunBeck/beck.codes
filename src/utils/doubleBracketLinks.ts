import linkMaps from "../../links.json";
import { getBracketPairs } from "./bracketPairs";

interface OutboundLinkType {
  matchedId: string;
  title: string;
  slug: string;
  growthStage: string;
  description: string;
}

export function doubleBracketLinks(content: string, title: string) {
  if (!content) return content;

  const matchingBracketPairs = getBracketPairs(content);
  if (matchingBracketPairs.length < 1) return content;

  const outboundLinks = linkMaps.find((map) => map.ids[0] === title)
    ?.outboundLinks as OutboundLinkType[];

  let result = "";
  let previousIndex = 0;

  for (const pair of matchingBracketPairs) {
    const opening = pair[0];
    const closing = pair[1];

    const foundLinkText = content.substring(opening + 1, closing - 1);

    const matchedOutboundLink = outboundLinks
      ? outboundLinks.find(
          (ol) => ol.matchedId.toLowerCase() === foundLinkText.toLowerCase(),
        )
      : null;

    if (matchedOutboundLink) {
      const {
        slug,
        title: matchedTitle,
        description: matchedDescription,
      } = matchedOutboundLink;

      result += content.substring(previousIndex, opening - 1);
      result += `<InternalLink title={"${matchedTitle}"} description={"${matchedDescription}"}  href={"/${slug}"}>`; // append JSX opening tags
      result += foundLinkText; // skip opening brackets, then append link content (referenced post title or alias)
      result += "</InternalLink>";
    } else {
      result += content.substring(previousIndex, closing);
    }
    previousIndex = closing + 1;
  }
  const numPairs = matchingBracketPairs.length;
  const lastClosingBracket = matchingBracketPairs[numPairs - 1][1];

  result += content.substring(lastClosingBracket + 1, content.length - 1);
  return result;
}
