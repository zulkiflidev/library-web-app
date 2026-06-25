import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';
import type { Book } from '../types';

import toast from 'react-hot-toast';
import { AxiosError } from 'axios';


const useBorrowBook = (bookId: number) => {

    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: async (days: number) => {
                const response = await api.post('/loans', { bookId, days})
                return response.data;
            },

            onMutate: async() => {
                await queryClient.cancelQueries( { queryKey: ['book', String(bookId)]}   );                
                const previous = queryClient.getQueryData(['book', String(bookId)]);

                
                queryClient.setQueryData(['book', String(bookId)], (old: Book) => ({

                    ...old,
                    availableCopies: old.availableCopies - 1,

                }));

                return { previous };
            },
            onSuccess: () => {
                toast.success('Book borrowed successfully');

            },
            onError: (err: AxiosError<{ message: string }>, _vars, context) => {
                queryClient.setQueryData(['book', bookId], context?.previous);
                toast.error(  err ?.response?.data?.message ?? 'Failed to borrow the book!');
            },

            onSettled: () => {

                queryClient.invalidateQueries({
                   
                    queryKey: ['books', String(bookId)]

                })
            }

        }
    )   

}


export default useBorrowBook;