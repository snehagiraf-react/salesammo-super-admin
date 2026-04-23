import { useQuery } from "@tanstack/react-query";
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