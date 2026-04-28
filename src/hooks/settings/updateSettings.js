import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";

export const useSettingsUpdate = () => {
  return useMutation({
    mutationFn: async ({ body }) => {
      const res = await api.put("/settings", body);
      return res.data;
    },
  });
};