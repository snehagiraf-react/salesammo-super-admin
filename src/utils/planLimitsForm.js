export const PLAN_LIMIT_FIELDS = [
  { key: "maxUsers", label: "Max Users", placeholder: "e.g., 10" },
  { key: "maxProducts", label: "Max Products", placeholder: "e.g., 10" },
  { key: "maxProductImages", label: "Max Product Images", placeholder: "e.g., 10" },
  { key: "maxProductVideos", label: "Max Product Videos", placeholder: "e.g., 5" },
  { key: "maxProductCatalogs", label: "Max Product Catalogues", placeholder: "e.g., 5" },
  { key: "maxProductImageSizeMB", label: "Max Product Image Size (MB)", placeholder: "e.g., 5" },
  { key: "maxProductVideoSizeMB", label: "Max Product Video Size (MB)", placeholder: "e.g., 50" },
  { key: "maxProductCatalogSizeMB", label: "Max Product Catalogue Size (MB)", placeholder: "e.g., 20" },
  { key: "maxApplicationImages", label: "Max Application Images (upload & approve)", placeholder: "e.g., 10" },
  { key: "maxCaseStudies", label: "Max Case Studies", placeholder: "e.g., 10" },
  { key: "maxCaseStudyAttachments", label: "Max Case Study Attachments", placeholder: "e.g., 10" },
  { key: "storageSpaceInGB", label: "Storage (GB)", placeholder: "e.g., 5" },
];

export const PLAN_LIMIT_DEFAULTS = {
  maxUsers: 1,
  maxProducts: 10,
  maxProductImages: 10,
  maxProductVideos: 5,
  maxProductCatalogs: 5,
  maxProductImageSizeMB: 5,
  maxProductVideoSizeMB: 50,
  maxProductCatalogSizeMB: 20,
  maxApplicationImages: 10,
  maxCaseStudies: 10,
  maxCaseStudyAttachments: 10,
  storageSpaceInGB: 5,
};

const LIMIT_ALIASES = {
  maxProductImages: ["maxImageUpload"],
  maxApplicationImages: [
    "maxAppicationImageUpload",
    "maxApplicationImageUpload",
  ],
};

const toFiniteNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
};

const pickLimitValue = (source, key, { useDefaults = true } = {}) => {
  const keys = [key, ...(LIMIT_ALIASES[key] || [])];
  for (const candidate of keys) {
    const parsed = toFiniteNumber(source?.[candidate]);
    if (parsed !== undefined) return parsed;
  }
  if (!useDefaults) return "";
  return PLAN_LIMIT_DEFAULTS[key] ?? "";
};

/** Fill form fields from API/DB limits (stored values win; missing → defaults). */
export const hydratePlanLimits = (rawLimits) => {
  const source =
    rawLimits && typeof rawLimits === "object" && !Array.isArray(rawLimits)
      ? rawLimits
      : {};

  return PLAN_LIMIT_FIELDS.reduce((acc, field) => {
    acc[field.key] = pickLimitValue(source, field.key, { useDefaults: true });
    return acc;
  }, {});
};

/** Payload for create/update — nested `limits` only (avoids Joi dotted-key collisions). */
export const buildPlanLimitsPayload = (rawLimits) => {
  const limits = PLAN_LIMIT_FIELDS.reduce((acc, field) => {
    const parsed = toFiniteNumber(rawLimits?.[field.key]);
    acc[field.key] =
      parsed !== undefined
        ? parsed
        : PLAN_LIMIT_DEFAULTS[field.key] ?? 0;
    return acc;
  }, {});

  return { limits };
};
