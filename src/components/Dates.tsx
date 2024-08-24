import type { MdxDateType } from "@/utils/mdxUtils";
import { differenceInDays, parse } from "date-fns";
import { RelativeDate } from "./RelativeDate";

interface DateProps {
  startDate: MdxDateType;
  updated?: MdxDateType
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
        <span>
          Written <RelativeDate rawDate={updated} />
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col text-sm">
      <span>
        Written <RelativeDate rawDate={startDate} />
      </span>
      {updated && (
        <span>
          Last updated <RelativeDate rawDate={updated} />
        </span>
      )}
    </div>
  );
}
