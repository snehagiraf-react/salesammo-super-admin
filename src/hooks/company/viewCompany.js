import {
  useQuery,
} from '@tanstack/react-query'
import api  from '../../services/api';


export const useViewCompanyQuery = () => {

  return useQuery({
    queryKey: ['viewCompany'],
    queryFn: async () => {
        console.log('View Company request body:');
      const res = await api.get("/company/all");
      return res.data;
    }
  });
};