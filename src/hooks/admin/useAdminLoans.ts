import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { AdminLoansResponse } from '@/types';



const useAdminLoans = (q: string = '', status: string = 'all') => {

    return useQuery(
        {
            queryKey: ['adminLoans', q, status],
            queryFn: async () => {
                const response = await api.get('/admin/loans',{
                    params: { 
                                q, 
                                status,
                                page: 1, 
                                limit: 20 
                            }
                })
                return response.data.data as AdminLoansResponse;
            }
        }
    );
}

export default useAdminLoans;

    