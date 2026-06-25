import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { MyReviewResponse } from '@/types';


function useMyReviews() {

    return useQuery({
        queryKey: ['myReviews'],
        
        queryFn: async () => {                
            const response = await api.get('/me/reviews');
            return response.data.data as MyReviewResponse;

        },
   
    });
}

export default useMyReviews;