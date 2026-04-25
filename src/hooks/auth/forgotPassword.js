import {
  useMutation,
} from '@tanstack/react-query'
import api  from '../../services/api';


export const useForgotPasswordMutation = () => {



  return useMutation({
    mutationFn: async (body) => {
        console.log('Forgot password request body:', body);
      const res = await api.post("/auth/forgot-password", body);
      return res.data;
    }
  });
};