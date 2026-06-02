import { unwrapApiPayload } from "./mapDashboardCards";

const DEFAULT_LINES = [
  {
    dataKey: "revenue",
    name: "Revenue",
    stroke: "#5C308D",
    dotColor: "#ffffff",
    yAxisId: "left",
  },
  {
    dataKey: "companyCount",
    name: "Companies",
    stroke: "#00A63E",
    dotColor: "#ffffff",
    yAxisId: "right",
  },
];

function resolvePoints(payload) {
  if (!payload) return null;
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.points)) return payload.points;
  return null;
}

function resolveXKey(points) {
  if (!points?.length) return "month";
  const sample = points[0];
  if (sample.month != null) return "month";
  if (sample.name != null) return "name";
  return "month";
}

function buildLines(points, providedLines) {
  if (providedLines?.length) return providedLines;

  const hasRevenue = points.some((p) => p.revenue != null);
  const hasCompanies = points.some((p) => p.companyCount != null);

  if (!hasRevenue && !hasCompanies) return DEFAULT_LINES.slice(0, 1);

  return DEFAULT_LINES.filter((line) => {
    if (line.dataKey === "revenue") return hasRevenue;
    if (line.dataKey === "companyCount") return hasCompanies;
    return true;
  });
}

export function mapGraphToChart(response) {
  const payload = unwrapApiPayload(response);
  const points = resolvePoints(payload);

  if (!points?.length) return null;

  const xKey = payload?.xKey ?? resolveXKey(points);
  const lines = buildLines(points, payload?.lines);

  return {
    data: points,
    lines,
    xKey,
    title: payload?.title ?? "Revenue Growth",
    subtitle: payload?.subtitle ?? "Monthly revenue trends overview",
  };
}
