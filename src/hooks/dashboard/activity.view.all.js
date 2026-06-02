import {
    useQuery,
  } from '@tanstack/react-query'
  import api  from '../../services/api';

  export const useViewActivityQuery = (options = {}) => {
    const { enabled = true, params = {} } = options;

    return useQuery({
      queryKey: ['viewActivity', params],
      queryFn: async () => {
        const res = await api.get('/dashboard/activity-log', { params });
        return res.data;
      },
      enabled,
    });
  };