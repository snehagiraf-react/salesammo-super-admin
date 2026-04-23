import {
  useQuery,
} from '@tanstack/react-query'
import api  from '../../services/api';


export const useViewPlanQuery = () => {

  return useQuery({
    queryKey: ['viewPlan'],
    queryFn: async () => {
        console.log('View Plan request body:');
      const res = await api.get("/plan/all");
      return res.data;
    }
  });
};