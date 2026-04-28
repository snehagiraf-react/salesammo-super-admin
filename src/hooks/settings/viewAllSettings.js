import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

export const useViewSettingsList = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await api.get('/settings');
      return res.data;
    },
  });
};