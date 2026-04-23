import {
  useMutation,
} from '@tanstack/react-query'
import api  from '../../services/api';


export const useLoginMutation = () => {



  return useMutation({
    mutationFn: async (body) => {
        console.log('Login request body:', body);
      const res = await api.post("/auth/login", body);
      return res.data;
    }
  });
};