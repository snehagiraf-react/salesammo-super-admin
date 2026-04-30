import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

export const useViewSingleSubscription = (id) => {
  return useQuery({
    queryKey: ['viewSubscriptionDetails', id],
    enabled: !!id, 
    queryFn: async ({ queryKey }) => {
      const subscriptionId = queryKey[1];   
      const res = await api.get(`/subscription/${subscriptionId}`);
      return res.data;
    },
  });
};