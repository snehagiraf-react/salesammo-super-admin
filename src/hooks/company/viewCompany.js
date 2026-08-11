import {
  useQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import api from "../../services/api";

export const useViewCompanyQuery = () => {
  return useQuery({
    queryKey: ["viewCompany"],
    queryFn: async () => {
      const res = await api.get("/company/all");
      return res.data;
    },
  });
};

export const useCompanyStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => {
      const isFormData = body instanceof FormData;

      const config = isFormData
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : {};

      const res = await api.post("/company/create", body, config);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["viewCompany"] });
    },
  });
};
