import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { AdminLoansResponse } from '@/types';



const useAdminLoans = (q: string = '') => {

    return useQuery(
        {
            queryKey: ['adminLoans', q],
            queryFn: async () => {
                const response = await api.get('/admin/loans',{
                    params: { q, page: 1, limit: 20 }
                })
                return response.data.data as AdminLoansResponse;
            }
        }
    );
}

export default useAdminLoans;

    