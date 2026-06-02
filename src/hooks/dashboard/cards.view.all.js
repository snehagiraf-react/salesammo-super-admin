import {
  useQuery,
} from '@tanstack/react-query'
import api  from '../../services/api';


export const useViewCardsQuery = (options = {}) => {
  const { enabled = true } = options;

  return useQuery({
    queryKey: ['viewCards'],
    queryFn: async () => {
      const res = await api.get("/dashboard/cards");
      return res.data;
    },
    enabled,
  });
};