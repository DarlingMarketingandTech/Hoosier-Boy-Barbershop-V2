import {
  WEEKLY_HOURS,
  type TimeShift,
  type WeekdayLong,
} from "@/lib/constants";

type OpeningHoursSpecification = {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string | string[];
  opens: string;
  closes: string;
};

/** Expand weekly shifts into Schema.org OpeningHoursSpecification entries. */
export function buildOpeningHoursSpecification(): OpeningHoursSpecification[] {
  const specs: OpeningHoursSpecification[] = [];

  (Object.entries(WEEKLY_HOURS) as [WeekdayLong, TimeShift[]][]).forEach(
    ([day, shifts]) => {
      shifts.forEach((shift) => {
        specs.push({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: `https://schema.org/${day}`,
          opens: shift.open,
          closes: shift.close,
        });
      });
    }
  );

  return specs;
}
