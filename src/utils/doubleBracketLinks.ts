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

    const foundLinkText = content.substring(opening + 2, closing - 2);

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

      // Append content before the bracket
      result += content.substring(previousIndex, opening);

      // Append JSX with properly escaped attributes
      result += `<InternalLink title={${JSON.stringify(matchedTitle)}} description={${JSON.stringify(matchedDescription)}} href={${JSON.stringify(`/${slug}`)}}>`;
      result += foundLinkText;
      result += "</InternalLink>";
    } else {
      result += content.substring(previousIndex, closing);
    }
    previousIndex = closing + 1;
  }
  const numPairs = matchingBracketPairs.length;
  const lastClosingBracket = matchingBracketPairs[numPairs - 1][1];

  result += content.substring(lastClosingBracket + 1);
  return result;
}
