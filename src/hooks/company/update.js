import {
    useMutation,
  useQuery,
} from '@tanstack/react-query'
import api  from '../../services/api';

export const useUpdateCompanyMutation = () => {
  return useMutation({
    mutationKey: ['updateCompany'],
    mutationFn: async (id) => {
        console.log('Update Company request body:', id);
      const res = await api.put("/company/update", { id });
      return res.data;
    }
  });
};