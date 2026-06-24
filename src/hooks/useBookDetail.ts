import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';
import type { Book } from '../types';


const useBookDetail = (id: string) => {

    return useQuery(

        {
            queryKey: ['book', id],
            queryFn: async () => {
                const response = await api.get(`/books/${id}`);
                return response.data.data  as Book;
            },
        }

    );
}


export default useBookDetail;
