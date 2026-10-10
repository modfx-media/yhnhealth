/** Clinic calendar. Date-only values and UTC midnight stay on that calendar day. */
const CLINIC_TZ = "America/New_York"

const MONTHS: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
}

/**
 * Calendar day (YYYY-MM-DD) for a publish timestamp.
 * `YYYY-MM-DD` and `...T00:00:00.000Z` are the selected day, not the previous evening in US timezones.
 * Other timestamps use America/New_York.
 */
export function calendarDay(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return ""

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed

  const utcMidnight = trimmed.match(/^(\d{4}-\d{2}-\d{2})T00:00:00(?:\.000)?Z$/)
  if (utcMidnight) return utcMidnight[1]

  const display = trimmed.match(/^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/)
  if (display) {
    const month = MONTHS[display[1].toLowerCase()]
    if (month) return `${display[3]}-${month}-${display[2].padStart(2, "0")}`
  }

  const parsed = new Date(trimmed)
  if (Number.isNaN(parsed.getTime())) return ""
  return parsed.toLocaleDateString("en-CA", { timeZone: CLINIC_TZ })
}

export function formatCalendarDate(value: string): string {
  const day = calendarDay(value)
  const match = day.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return value
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])))
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}

/** True when a post's calendar day is today or earlier in America/New_York. Missing dates stay visible. */
export function isPublishDateLive(value: string | null | undefined, now = new Date()): boolean {
  if (!value || !value.trim()) return true
  const day = calendarDay(value)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return true
  const today = now.toLocaleDateString("en-CA", { timeZone: CLINIC_TZ })
  return day <= today
}
