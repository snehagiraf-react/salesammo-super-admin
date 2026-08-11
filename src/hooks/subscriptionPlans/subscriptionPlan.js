import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

const extractSubscriptions = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.subscriptions)) return payload.subscriptions;
  if (Array.isArray(payload?.data?.subscriptions)) {
    return payload.data.subscriptions;
  }
  return [];
};

export const useViewSubscriptionPlansQuery = () => {
  return useQuery({
    queryKey: ["viewSubscriptionPlans"],
    queryFn: async () => {
      // Backend paginates (default limit 10). Request a large page so the
      // admin list/search can show newly created subscriptions.
      const res = await api.get("/subscription/all", {
        params: { page: 1, limit: 1000, sort: "createdAt" },
      });
      return extractSubscriptions(res.data);
    },
  });
};
