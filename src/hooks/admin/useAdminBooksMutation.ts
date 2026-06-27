import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import api from '@/lib/axios';
import { AxiosError } from 'axios';



interface BookPayload {

    title: string;
    isbn: string;
    categoryId: number;
    authorId: number;
    authorName: string;
    description: string;
    publishedYear: number;
    totalCopies: number;
    availableCopies: number;

}

const useAddBook = () => {

    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationFn: async (payload: BookPayload) =>{

                const response = await api.post('/books', payload);
                return response.data;
            },
            onSuccess: () => {
                toast.success('Book added successfully');
                queryClient.invalidateQueries(  {queryKey: ['adminBooks']});

            },
            onError: (error: AxiosError<{ message: string}>) =>{

                toast.error( error?.response?.data?.message ?? 'Failed to add Book'  );
            }
        }
    );
}


const useEditBook = () => {

    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: async(
                {
                    id,
                    payload
                }: {
                    id: number;
                    payload: Partial<BookPayload>;
                }
            ) => {

                const response = await api.put(`/books/${id}`, payload);
                return response.data;
            },

            onSuccess: () => {
            
                toast.success('Book has been successfully updated!');
                queryClient.invalidateQueries(  {queryKey: ['adminBooks']});

            },

            onError: ( error: AxiosError<{ message: string}>) => {

                toast.error(
                    error?.response?.data?.message ?? 'Failed to update Book'
                );
            }
        }
    );

}

const useDeleteBook = () => {

    const queryClient = useQueryClient();
    
    return useMutation(

        {
            mutationFn: async (id: number) => {

                const response = await api.delete(`/books/${id}`);
                return response.data;

            },

            onSuccess: () => {

                toast.success('Book has successfully deleted!');
                queryClient.invalidateQueries(  {queryKey: ['adminBooks']});


            },

            onError: (
                error: AxiosError<{ message: string}>
            ) => {
                toast.error(
                    error?.response?.data?.message ?? 'Failed to delete Book'
                );

            }
        }
    );

}

export { useAddBook, useEditBook, useDeleteBook }