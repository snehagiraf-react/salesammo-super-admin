import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

export const useRemovePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/plan/delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['viewpackage']);
    },
  });
};  