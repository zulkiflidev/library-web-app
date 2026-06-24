import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';
import type { Book } from '../types';


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

            onError: (_err, _vars, context) => {
                queryClient.setQueryData(['book', bookId], context?.previous);
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