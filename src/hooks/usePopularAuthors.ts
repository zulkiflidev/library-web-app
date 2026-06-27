import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { AuthorItem } from '@/types';


const usePopularAuthors = () =>{

    return useQuery(
        {
            queryKey: ['popularAuthors'],
            queryFn: async () => {

                const response = await api.get('/authors/popular', {
                    params: { limit: 6 }
                });
                return response.data.data.authors as AuthorItem[];


            }
        }
    );

}

export default usePopularAuthors;