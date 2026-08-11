/**
 * Display helpers for subscription plan field.
 */
export const getPlanLabel = (plan) => {
  if (!plan) return "";
  if (typeof plan === "string") return plan;
  if (typeof plan === "object") {
    return plan.name || plan.code || plan._id || plan.id || "";
  }
  return String(plan);
};

export const getPlanId = (plan) => {
  if (!plan) return "";
  if (typeof plan === "string") return plan;
  if (typeof plan === "object") return plan._id || plan.id || "";
  return "";
};
