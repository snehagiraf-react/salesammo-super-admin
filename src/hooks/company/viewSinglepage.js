import { useQuery, useQueryClient, useMutation} from "@tanstack/react-query";
import api from "../../services/api";

export const useViewSingleCompany = (id) => {
  return useQuery({
    queryKey: ['viewCompanyDetails', id],
    enabled: !!id, 
    queryFn: async ({ queryKey }) => {
      const companyId = queryKey[1];   
      const res = await api.get(`/company/${companyId}`);
      return res.data;
    },
  });
};

export const useRemoveCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/company/delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['viewcompany']);
    },
  });
};  