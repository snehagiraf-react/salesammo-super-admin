import { unwrapApiPayload } from "./mapDashboardCards";
import { formatTimeAgo } from "./formatTimeAgo";

const ACTION_COLORS = {
  COMPANY_LOGIN: "#5C308D",
  SUBSCRIPTION: "#00A63E",
  USER_INVITED: "#F59E0B",
};

const DEFAULT_MARK = "#5C308D";

function resolveActivityList(payload) {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.activities)) return payload.activities;
  return [];
}

function resolveMark(action) {
  if (!action) return DEFAULT_MARK;
  return ACTION_COLORS[action] ?? DEFAULT_MARK;
}

export function mapActivityItems(response) {
  const payload = unwrapApiPayload(response);
  const list = resolveActivityList(payload);

  if (!list.length) return [];

  return list.map((item, index) => ({
    id: item._id ?? item.id ?? index,
    action: item.action ?? "",
    description: item.description ?? "",
    time: formatTimeAgo(item.createdAt ?? item.updatedAt),
    timestamp: item.createdAt ?? item.updatedAt ?? null,
    mark: item.mark ?? item.color ?? resolveMark(item.action),
  }));
}
