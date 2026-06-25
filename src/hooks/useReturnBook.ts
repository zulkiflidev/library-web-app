import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import toast from 'react-hot-toast';

import { AxiosError } from 'axios';



const useReturnBook = () => {

    const queryClient = useQueryClient();

    return useMutation(
        { 
            mutationFn: async(loanId: number) => {
                const response = await api.patch(`/loans/${loanId}/return`);
                return response.data;
            },
            onSuccess: () => { 
                toast.success('Book returned successfully');

                queryClient.invalidateQueries({
                    queryKey: ['loans']
                });


            },
            onError: (error: AxiosError<{ message: string }>) => { 

                toast.error(error?.response?.data?.message ?? 'Failed to return the book');
            },
            onSettled: () => { }
        }
    );
}

export default useReturnBook;