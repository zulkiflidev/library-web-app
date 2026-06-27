import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import api from '@/lib/axios';
import { AxiosError } from 'axios';


const useAddAuthor = () =>{

    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: async(
                data: {
                    name: string;
                    bio: string;
                }
            ) =>{
                const response = await api.post('/authors', data);
                return response.data;
            },

            onSuccess: () =>{

                toast.success('Author added successfully');
                queryClient.invalidateQueries(  {queryKey: ['authors']});

            },

            onError: ( error: AxiosError<{
                message: string;
            }>) =>{
                toast.error( 
                    error?.response?.data?.message ?? 'Failed to add Author'
                );
            }
        }
    );
}


export default useAddAuthor;