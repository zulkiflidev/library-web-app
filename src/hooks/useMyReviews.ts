import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { MyReviewResponse } from '@/types';


const useMyReviews = (q: string = '') => {

    return useQuery({
        queryKey: ['myReviews', q],
        
        queryFn: async () => {                
            const response = await api.get('/me/reviews', {
                params: {
                    q,
                    page: 1,
                    limit: 20
                }
            });
            return response.data.data as MyReviewResponse;

        },
   
    });
}

export default useMyReviews;