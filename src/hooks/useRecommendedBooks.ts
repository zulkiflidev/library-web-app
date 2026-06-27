import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { Book } from '@/types';


const useRecomendedBooks = () => {

    return useQuery(

        {
            queryKey: ['recommendedBooks'],
            queryFn: async () => { 
                const response = await api.get('/books/recommend', {
                    params: { by: 'rating', limit: 8, page: 1 },
                });

                console.log('recommend response:', response.data)

                return response.data.data.books as Book[];
            

            }
        }
    );

}

export default useRecomendedBooks;