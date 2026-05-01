import { WEEKLY_HOURS, type WeekdayLong } from "@/lib/constants";

/** IANA timezone for Noblesville / Hamilton County. */
export const SHOP_TIMEZONE = "America/Indiana/Indianapolis";

function hmToMinutes(hm: string): number {
  const [h, m] = hm.split(":").map(Number);
  return h * 60 + m;
}

export function getShopWeekdayLong(date: Date): WeekdayLong {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: SHOP_TIMEZONE,
  }).format(date) as WeekdayLong;
}

/** Minutes since local midnight in {@link SHOP_TIMEZONE}. */
export function getShopMinutesSinceMidnight(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SHOP_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  let hour = 0;
  let minute = 0;
  for (const p of parts) {
    if (p.type === "hour") hour = Number(p.value);
    if (p.type === "minute") minute = Number(p.value);
  }
  return hour * 60 + minute;
}

export function isOpenAt(date: Date): boolean {
  const day = getShopWeekdayLong(date);
  const shifts = WEEKLY_HOURS[day];
  if (!shifts?.length) return false;

  const now = getShopMinutesSinceMidnight(date);
  return shifts.some(({ open, close }) => {
    const o = hmToMinutes(open);
    const c = hmToMinutes(close);
    return now >= o && now < c;
  });
}

function formatHmAmPm(hm: string): string {
  const [hStr, mStr] = hm.split(":");
  const h = Number(hStr);
  const m = Number(mStr);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = ((h + 11) % 12) + 1;
  const mm = m.toString().padStart(2, "0");
  return `${h12}:${mm} ${suffix}`;
}

/** Compact hours line for footer / booking drawer. */
export function formatHoursSummary(): string {
  return "Tue–Sat · 8:00 AM – 11:00 AM · 11:30 AM – 2:00 PM · Closed Sun–Mon";
}

/**
 * Hero badge — live status relative to shop clock.
 */
export function formatHeroHoursBadge(date: Date): string {
  const todayDay = getShopWeekdayLong(date);
  const todayShifts = WEEKLY_HOURS[todayDay];
  const now = getShopMinutesSinceMidnight(date);

  if (todayShifts?.length) {
    for (const shift of todayShifts) {
      const o = hmToMinutes(shift.open);
      const c = hmToMinutes(shift.close);
      if (now >= o && now < c) {
        return `Open now · Until ${formatHmAmPm(shift.close)}`;
      }
    }

    const upcoming = todayShifts.find((s) => hmToMinutes(s.open) > now);
    if (upcoming) {
      return `Opens today · ${formatHmAmPm(upcoming.open)}`;
    }
  }

  const probe = new Date(date.getTime());
  for (let d = 1; d <= 7; d++) {
    probe.setDate(probe.getDate() + 1);
    const wd = getShopWeekdayLong(probe);
    const shifts = WEEKLY_HOURS[wd];
    if (shifts?.length) {
      const label = d === 1 ? "Tomorrow" : wd.slice(0, 3);
      return `${label} · ${formatHmAmPm(shifts[0].open)}`;
    }
  }

  return "Call for availability";
}
