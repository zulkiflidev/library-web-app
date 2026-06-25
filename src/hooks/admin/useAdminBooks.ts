import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { AdminBooksResponse } from '@/types';


const useAdminBooks = (q: string = '') => {

    return useQuery(
        {
            queryKey: ['adminBooks', q],
            queryFn: async () =>{
                const response = await api.get('/admin/books', {
                    params: { q, page: 1, limit: 20 }
                });

                return response.data.data as AdminBooksResponse;
            }
        }
    );

}

export default useAdminBooks;