import {
  differenceInDays,
  formatDistanceToNow,
  isMatch,
  parse,
} from "date-fns";

export type MdxDateType = `${number}-${number}-${number}`;
interface DateProps {
  startDate: MdxDateType;
  updated: MdxDateType;
}
export function Dates({ startDate, updated }: DateProps) {
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

export function RelativeDate({ rawDate }: { rawDate: MdxDateType }) {
  if (isMatch(rawDate, "yyyy-MM-dd")) {
    const date = parse(rawDate, "yyyy-MM-dd", new Date());
    const relativeDate = formatDistanceToNow(date, {
      addSuffix: true,
    });
    return relativeDate;
  }
}
