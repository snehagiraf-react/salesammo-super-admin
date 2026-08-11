import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

export const useViewRevenueCardsQuery = (options = {}) => {
  const { enabled = true } = options;
  return useQuery({
    queryKey: ["viewRevenueCards"],
    queryFn: async () => {
      const res = await api.get("/revenue/cards");
      return res.data;
    },
    enabled,
  });
};