import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

export const useViewPlanQuery = () => {
  return useQuery({
    queryKey: ["viewpackage"],
    queryFn: async () => {
      const res = await api.get("/plan/all");
      const payload = res.data;
      if (Array.isArray(payload)) return payload;
      if (Array.isArray(payload?.data)) return payload.data;
      if (Array.isArray(payload?.plans)) return payload.plans;
      return [];
    },
  });
};