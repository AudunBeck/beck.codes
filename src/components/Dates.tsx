import type { MdxDateType } from "@/utils/mdxUtils";
import { differenceInDays, parse } from "date-fns";
import { RelativeDate } from "./RelativeDate";

interface DateProps {
  startDate: MdxDateType;
  updated?: MdxDateType;
}

export function Dates({ startDate, updated = startDate }: DateProps) {
  const relativeStartDate = parse(startDate, "yyyy-MM-dd", new Date());
  const relativeUpdatedDate = parse(updated, "yyyy-MM-dd", new Date());

  const dateDifference = differenceInDays(
    relativeUpdatedDate,
    relativeStartDate,
  );

  if (dateDifference < 3) {
    return (
      <div className="flex flex-col text-sm">
        <time dateTime={updated}>
          Written <RelativeDate rawDate={updated} />
        </time>
      </div>
    );
  }

  return (
    <div className="flex flex-col text-sm">
      <time dateTime={startDate}>
        Written <RelativeDate rawDate={startDate} />
      </time>
      {updated && (
        <time dateTime={updated}>
          Last updated <RelativeDate rawDate={updated} />
        </time>
      )}
    </div>
  );
}
