import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { AuthorBooksResponse } from '@/types';

const useAuthorBooks = (id: string) => {

    return useQuery(

        {
            queryKey: ['authorBooks', id],
            queryFn: async() =>{

                const response = await api.get(`/authors/${id}/books`, {
                    params: { page: 1, limit: 12 }
                })
                return response.data.data as AuthorBooksResponse;
            }

        }
    );

}

export default useAuthorBooks;