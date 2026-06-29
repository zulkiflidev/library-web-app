import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { AdminBooksResponse } from '@/types';


const useAdminBooks = (q: string = '', status: string = 'all') => {

    return useQuery(
        {
            queryKey: ['adminBooks', q, status],
            queryFn: async () =>{
                const response = await api.get('/admin/books', {
                    params: { 
                         status: status,
                         q, 
                         page: 1, 
                         limit: 20 
                    
                    }
                });

                return response.data.data as AdminBooksResponse;
            }
        }
    );

}

export default useAdminBooks;