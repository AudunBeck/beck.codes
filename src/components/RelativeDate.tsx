import { formatDistanceToNow, isMatch, parse } from "date-fns";

export type MdxDateType = `${number}-${number}-${number}`;
interface DateProps {
  startDate: MdxDateType;
  updated: MdxDateType;
}
export function Dates({ startDate, updated }: DateProps) {
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
