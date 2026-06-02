import React from "react";
import { Building2, Users, DollarSign, Podcast } from "lucide-react";

const METRIC_CONFIG = [
  {
    keys: ["totalCompaniesCount"],
    title: "Total Companies",
    icon: Building2,
  },
  {
    keys: ["totalSalesUserCount"],
    title: "Total Sales Users",
    icon: Users,
  },
  {
    keys: ["totalActiveSubscriptionCount"],
    title: "Active Subscriptions",
    icon: Podcast,
  },
  {
    keys: ["totalRevenue"],
    title: "Total Revenue",
    icon: DollarSign,
    format: "currency",
  },
];

const ICON_BY_TITLE = {
  "total companies": Building2,
  "total sales users": Users,
  "active subscriptions": Podcast,
  "total revenue": DollarSign,
};

function pickValue(obj, keys) {
  for (const key of keys) {
    if (obj[key] !== undefined && obj[key] !== null) return obj[key];
  }
  return undefined;
}

function formatValue(value, format) {
  if (value == null || value === "") return "—";
  if (format === "currency" && typeof value === "number") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }
  if (typeof value === "number") return value.toLocaleString();
  return String(value);
}

function parseTrend(trend) {
  if (trend == null || trend === "") {
    return { trend: undefined, isPositive: true };
  }
  const str = String(trend);
  const isPositive = !str.trim().startsWith("-");
  return { trend: str, isPositive };
}

function resolveIcon(item) {
  if (item.icon) return item.icon;
  const titleKey = String(item.title || "").toLowerCase();
  const Icon = ICON_BY_TITLE[titleKey];
  return Icon ? <Icon size={25} /> : undefined;
}

function normalizeCard(item, index) {
  const { trend, isPositive } = parseTrend(
    item.trend ?? item.change ?? item.growth,
  );

  return {
    id: item.id ?? String(index + 1),
    icon: resolveIcon(item),
    title: item.title ?? item.label ?? item.name ?? "",
    value: formatValue(item.value ?? item.count ?? item.total),
    trend,
    isPositive: item.isPositive ?? item.is_positive ?? isPositive,
  };
}

export function mapStatsToCards(response) {
  const stats = unwrapApiPayload(response);
  if (!stats) return null;

  const list = Array.isArray(stats)
    ? stats
    : Array.isArray(stats.cards)
      ? stats.cards
      : null;

  if (list?.length) {
    return list.map(normalizeCard);
  }

  const cards = METRIC_CONFIG.map((config, index) => {
    const value = pickValue(stats, config.keys);
    if (value === undefined) return null;

    const Icon = config.icon;

    return {
      id: String(index + 1),
      icon: <Icon size={25} />,
      title: config.title,
      value: formatValue(value, config.format),
    };
  }).filter(Boolean);

  return cards.length ? cards : null;
}

export function unwrapApiPayload(response) {
  if (!response) return null;
  if (response.success && response.data != null) return response.data;
  return response.data ?? response;
}
