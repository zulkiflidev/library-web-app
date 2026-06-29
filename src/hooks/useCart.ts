import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';
import type { CartResponse } from '../types';

import toast from 'react-hot-toast';

export const useCart = () => {

    return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      
      const response = await api.get('/cart')
      return response.data.data as CartResponse
    
    },

  })
}

export const useAddToCart = (bookId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
      mutationFn: async () => {

        const response = await api.post('/cart/items', { bookId });
        return response.data;
      },

      onSuccess: () => {

          toast.success('Book successfully added to cart');
          queryClient.invalidateQueries(
              { 
                  queryKey: ['cart'] 
              }
          );
      },
  })
}

// export default { useCart, useAddToCart }


