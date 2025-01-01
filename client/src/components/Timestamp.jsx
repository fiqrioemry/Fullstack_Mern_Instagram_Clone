import { cn } from "@/lib/utils";
import ReactTimeago from "react-timeago";

function Timestamp({ createdAt, className }) {
  return (
    <ReactTimeago
      className={cn(
        "font-medium text-neutral-500 dark:text-neutral-400 text-xs",
        className
      )}
      date={createdAt}
      formatter={(value, unit, suffix, epochMiliseconds, nextFormatter) => {
        if (unit === "second") {
          return `${value}${unit[0]}`;
        } else if (unit === "minute") {
          return `${value}${unit[0]}`;
        } else if (unit === "hour") {
          return `${value}${unit[0]}`;
        } else if (unit === "day") {
          return `${value}${unit[0]}`;
        } else if (unit === "week") {
          return `${value}${unit[0]}`;
        } else if (unit === "month") {
          return `${value}${unit[0]}`;
        } else if (unit === "year") {
          return `${value}${unit[0]}`;
        } else {
          return nextFormatter?.(value, unit, suffix, epochMiliseconds);
        }
      }}
    />
  );
}

export default Timestamp;
