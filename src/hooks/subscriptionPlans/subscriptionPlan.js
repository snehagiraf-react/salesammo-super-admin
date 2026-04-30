import {
  useQuery,
} from '@tanstack/react-query'
import api  from '../../services/api';


export const useViewSubscriptionPlansQuery = () => {

  return useQuery({
    queryKey: ['viewSubscriptionPlans'],
    queryFn: async () => {
        console.log('View Subscription Plans request body:');
      const res = await api.get("/subscription/all");
      return res.data;
    }
  });
};