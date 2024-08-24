"use client";

import type { MdxDateType } from "@/utils/mdxUtils";
import { formatDistanceToNow, isMatch, parse } from "date-fns";

export function RelativeDate({ rawDate }: { rawDate: MdxDateType }) {
  if (isMatch(rawDate, "yyyy-MM-dd")) {
    const date = parse(rawDate, "yyyy-MM-dd", new Date());
    const oneDay = 1000 * 3600 * 24;
    const distance = Date.now() - date.getTime();

    if (distance < oneDay && distance > 0) {
      return "today";
    }

    const relativeDate = formatDistanceToNow(date, {
      addSuffix: true,
    });
    return relativeDate;
  }
}
