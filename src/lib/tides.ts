// High/low tide predictions for Charleston Harbor from NOAA CO-OPS.
//
// Fetched on the server and cached for six hours. We ask for three days so the
// client can always find the next few tides from "now", however old the cached
// page is. Times come back as Eastern wall-clock strings ("2026-10-02 13:03")
// and are passed through untouched; the client compares them against the
// current time in America/New_York, so no timezone math happens on a server
// that runs in UTC.

const STATION = "8665530"; // Charleston, Cooper River Entrance

export type Tide = {
  /** Eastern local time, "YYYY-MM-DD HH:mm". */
  t: string;
  type: "H" | "L";
  /** Feet above MLLW. */
  ft: number;
};

const easternDate = (d: Date) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
  return parts.replaceAll("-", "");
};

export async function getTides(): Promise<Tide[]> {
  const now = new Date();
  const begin = easternDate(new Date(now.getTime() - 24 * 3600 * 1000));
  const end = easternDate(new Date(now.getTime() + 3 * 24 * 3600 * 1000));
  const url =
    "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter" +
    `?product=predictions&application=palmetto_tide_charters&begin_date=${begin}&end_date=${end}` +
    `&datum=MLLW&station=${STATION}&time_zone=lst_ldt&units=english&interval=hilo&format=json`;

  try {
    const res = await fetch(url, { next: { revalidate: 21600 }, signal: AbortSignal.timeout(5000) });
    if (!res.ok) return [];
    const data = (await res.json()) as { predictions?: { t: string; v: string; type: string }[] };
    return (data.predictions ?? [])
      .filter((p) => (p.type === "H" || p.type === "L") && /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(p.t))
      .map((p) => ({ t: p.t, type: p.type as "H" | "L", ft: Math.round(parseFloat(p.v) * 10) / 10 }));
  } catch {
    // A tide widget is a nice-to-have. Never let NOAA being down break the page.
    return [];
  }
}
