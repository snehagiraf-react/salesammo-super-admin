/**
 * Resolve billing cycle from stored value or date span.
 * Older DB rows may not have billingCycle persisted yet.
 */
export const resolveBillingCycle = (subscription = {}) => {
  const raw = String(subscription?.billingCycle || "")
    .trim()
    .toLowerCase();
  if (raw === "monthly" || raw === "yearly") return raw;

  const start = subscription?.startDate
    ? new Date(subscription.startDate)
    : null;
  const end = subscription?.endDate ? new Date(subscription.endDate) : null;

  if (
    start &&
    end &&
    !Number.isNaN(start.getTime()) &&
    !Number.isNaN(end.getTime())
  ) {
    const days = Math.round((end.getTime() - start.getTime()) / 86400000);
    if (days >= 300) return "yearly";
    if (days > 0) return "monthly";
  }

  return "";
};
