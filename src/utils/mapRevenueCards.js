import React from "react";
import {
  DollarSign,
  Building2,
  Users,
  UserCheck,
  TrendingUp,
} from "lucide-react";
import { unwrapApiPayload } from "./mapDashboardCards";

const REVENUE_METRIC_CONFIG = [
  {
    keys: ["totalRevenue"],
    title: "Total Revenue",
    icon: DollarSign,
    format: "currency",
  },
  {
    keys: ["totalCompanyRevenue"],
    title: "Company Revenue",
    icon: Building2,
    format: "currency",
  },
  {
    keys: ["totalUserRevenue"],
    title: "User Revenue",
    icon: Users,
    format: "currency",
  },
  {
    keys: ["totalCustomers"],
    title: "Total Customers",
    icon: UserCheck,
    format: "number",
  },
  {
    keys: ["totalPayingCompanies"],
    title: "Paying Companies",
    icon: Building2,
    format: "number",
  },
  {
    keys: ["totalCompaniesCount"],
    title: "Total Companies",
    icon: Building2,
    format: "number",
  },
  {
    keys: ["averageRevenuePerCompany"],
    title: "Avg Revenue / Company",
    icon: TrendingUp,
    format: "currencyDecimal",
  },
  {
    keys: ["averageTotalRevenuePerCompany"],
    title: "Avg Total Revenue / Company",
    icon: TrendingUp,
    format: "currencyDecimal",
  },
  {
    keys: ["averageRevenuePerPayingCompany"],
    title: "Avg Revenue / Paying Company",
    icon: TrendingUp,
    format: "currencyDecimal",
  },
];

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

  if (format === "currencyDecimal" && typeof value === "number") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  if (typeof value === "number") return value.toLocaleString();
  return String(value);
}

export function mapRevenueStatsToCards(response) {
  const stats = unwrapApiPayload(response);
  if (!stats || typeof stats !== "object") return null;

  const cards = REVENUE_METRIC_CONFIG.map((config, index) => {
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

