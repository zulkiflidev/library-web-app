import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { AuthorResponse } from '@/types';


const useAuthors = (q: string = '') => {

    return useQuery(
        {
            queryKey: ['authors', q],
            queryFn: async () => {
                const response = await api.get('/authors', {
                    params: { q}
                })
                return response.data.data as AuthorResponse;
            }
        }
    );
}


export default useAuthors