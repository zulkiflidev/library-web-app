import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/lib/axios'
import { toast } from 'react-hot-toast';

import type { Book, Review } from '@/types';


interface AddReviewPayload {
    bookId: number;
    star: number;
    comment: string;

}

const useReviewBook = (bookId: string | number) => {

    const queryClient = useQueryClient();

    const addReviewMutation = useMutation(
        {
            mutationFn: async (payload: AddReviewPayload) => {
                const response = await axiosInstance.post('/reviews', payload);
                return response.data;
            },
            onMutate: async (newReviewPayload) => {

                await queryClient.cancelQueries({
                    queryKey: ['book', String(bookId)]
                });

                const previousBook = queryClient.getQueryData<Book>(['book', String(bookId)]);

                if (previousBook) {
                
                    //fake review
                    const optimisticReview: Review = {
                    id: Date.now(), 
                    star: newReviewPayload.star,
                    comment: newReviewPayload.comment,
                    bookId: newReviewPayload.bookId,
                    userId: 0, 
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    user: {
                         id: 0,
                         name: 'Loading...', 
                        },
                    };

                    queryClient.setQueryData<Book>(['book', String(bookId)], {
                        ...previousBook,
                        reviews: [ optimisticReview, ...(previousBook.reviews || [])],
                    
                    })


                }

                return { previousBook };
            
            },
            onError: (err, _newReview, context: { previousBook: Book | undefined } | undefined) => {
                if (context?.previousBook) {
                    queryClient.setQueryData(['book', String(bookId)], context.previousBook);
                }
                toast.error('Failed to add review');
                console.log(err);
            },
            onSuccess: () => {
                toast.success('Review added successfully');
            },
            onSettled: () => {

                queryClient.invalidateQueries({
                    queryKey: ['book', String(bookId)]
                });

                queryClient.invalidateQueries({
                    queryKey: ['loans']
                });
            }

        }
    );

    const deleteReviewMutation = useMutation(
        {
            mutationFn: async (reviewId: number) => {
                await axiosInstance.delete(`/reviews/${reviewId}`);
                
            },
            onMutate: async (reviewId) => {

                await queryClient.cancelQueries({
                    queryKey: ['book', String(bookId)]

                })

                const previousBook = queryClient.getQueryData<Book>(['book', String(bookId)]);

                if (previousBook) {
                    queryClient.setQueryData<Book>(['book', String(bookId)], {
                        ...previousBook,
                        reviews: previousBook.reviews?.filter((review) => review.id !== reviewId)
                    });
                }
                return { previousBook };
            },
            onError: (err, _reviewId, context) => {
                if (context?.previousBook){
                    queryClient.setQueryData(['book', String(bookId)], context.previousBook);
                }
                toast.error('Failed to delete review');
                console.log(err);
            },
            onSuccess: () => {
                toast.success('Review deleted successfully');

            },
            onSettled: () => {
                queryClient.invalidateQueries({
                    queryKey: ['book', String(bookId)]
                })

            }
        }        
    );

    
    return {
        addReviewMutation,
        deleteReviewMutation,
    };

}

export default useReviewBook;