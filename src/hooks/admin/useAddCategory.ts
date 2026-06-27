import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import api from '@/lib/axios';
import { AxiosError } from 'axios';


const useAddCategory = () => {
    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: async (
                data: {
                    name: string;
                }
            ) => {
                const response = await api.post('/categories', data);
                return response.data;
            },
            onSuccess: () => {

                toast.success('Category added successfully');
                queryClient.invalidateQueries({ queryKey: ['categories'] });
            },
            onError: ( 
                error: AxiosError<{
                    message: string;    
                }>
            ) => {

                toast.error(
                    error?.response?.data?.message ?? 'Failed to add Category'
                );
            },
        }
    );
}
    

export default useAddCategory;