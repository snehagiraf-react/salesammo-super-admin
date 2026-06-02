import {
    useQuery,
  } from '@tanstack/react-query'
  import api  from '../../services/api';

  export const useViewGraphQuery = (options = {}) => {
    const { enabled = true } = options;

    return useQuery({
      queryKey: ['viewGraph'],
      queryFn: async () => {
        const res = await api.get('/dashboard/graph');
        return res.data;
      },
      enabled,
    });
  };