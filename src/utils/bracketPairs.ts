export function getBracketPairs(content: string) {
  const bracketPairs = [];
  if (content) {
    let pointer = 0;
    let lastChar = "";
    let bracketStart = -1;
    let codeBlock = "";

    while (pointer < content.length) {
      const char = content[pointer];

      if (char === "`") {
        if (content[pointer + 1] === "`" && content[pointer + 2] === "`") {
          if (codeBlock === "```") {
            codeBlock = "";
          } else {
            codeBlock = "```";
          }
          pointer += 2;
        } else {
          if (codeBlock === "`") {
            codeBlock = "";
          } else {
            codeBlock = "`";
          }
        }
      }

      if (!codeBlock) {
        if (char === "[") {
          if (lastChar !== "[[") {
            if (content[pointer - 1] === "[") {
              lastChar = "[[";
              bracketStart = pointer;
            } else {
              lastChar = "[";
              bracketStart = pointer;
            }
          }
        } else if (char === "]" && content[pointer - 1] === "]") {
          if (lastChar !== "") {
            lastChar = "";
            bracketPairs.push([bracketStart, pointer]);
            bracketStart = -1;
          }
        }
      }
      pointer++;
    }
  }

  return bracketPairs;
}
