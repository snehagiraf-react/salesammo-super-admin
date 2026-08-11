import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

export const useSubscriptionUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }) => {
      const res = await api.put(`/subscription/update/${id}`, body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["viewSubscriptionPlans"] });
    },
  });
};
