import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { LoanResponse } from '@/types';



const useLoans = (status: string = 'all') => {

    return useQuery(

        {
            queryKey: ['loans', status],
            queryFn: async () => {
                const response = await api.get('/loans/my', {
                    params: { status, page: 1, limit: 10 },
                });
                return response.data.data as LoanResponse;

            }

        }

    );

}


export default useLoans;