import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { LoanResponse } from '@/types';



const useLoans = (q: string ='', status: string = 'all') => {

    return useQuery(

        {
            queryKey: ['loans', status, q, status],
            queryFn: async () => {
                const response = await api.get('/loans/my', {
                    params: { 
                        q,
                        status, 
                        page: 1, 
                        limit: 20 
                        
                    },
                });
                return response.data.data as LoanResponse;

            }

        }

    );

}


export default useLoans;