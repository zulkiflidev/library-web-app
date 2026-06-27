//import React from 'react'
import { useParams } from 'react-router-dom';

import useBookDetail from '../../hooks/useBookDetail'

import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge';
//import { isPending } from '../../hooks/useBorrowBook'
import { Button } from '@/components/ui/button';

import useBorrowBook from '../../hooks/useBorrowBook';


function BookDetailPage() {
  
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, isError } = useBookDetail(id!);
  const { mutate: borrowBook, isPending } = useBorrowBook(book?.id ?? 0);


  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: Failed to load book details</div>
  if (!book) return <div>Book not found</div>

  return (
    <div className="space-y-8 px-4 md:px-20">
        <div className="flex gap-8">        
            <img src={book!.coverImage} alt={book!.title} 
                 className="w-48 h-64 object-cover rounded-lg shadow"    />
        
            <div className="flex-1 space-y-3">
                <h1 className="text-2xl font-semibold">{book.title}</h1>

                <p className="text-muted-foreground">{book.author.name}</p>

                <Badge variant="outline">{book.category?.name}</Badge>

                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{book.rating}</span>
                   
                    {/* <span className="text-muted-foreground text-sm">({book.ratingCount})</span> */}
                
                </div>
                

                {/* --mungkin nanti diperlukan...
                <p className="text-sm">
                    Available Stock: <span className="font-semibold"></span>
                </p> */}

                <p className="text-sm text-muted-foreground leading-relaxed">{book!.description}</p>

                {/* <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm font-medium disabled:opacity-50" disabled={book.availableCopies === 0}>
                    {book.availableCopies === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button> */}

                <Button 
                variant= "default"
                disabled={book!.availableCopies === 0 || isPending}
                onClick={() => borrowBook(7)}>

                    {isPending ? 'Loading...' : (
                        book!.availableCopies === 0 ? 'Out of Stock' : 'Add to Cart'
                    )}

                </Button>


            </div>
        </div>


        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Reviews</h2>
            
            {book!.reviews?.length === 0 && (
                <p className="text-sm text-muted-foreground">No reviews yet.</p>
            )}


            {book!.reviews?.map((review) => (
                <div key={review.id} className="border rounded-lg p-4 space-y-1">
                    <div className="flex items-center gap-2">
                        
                        {/* <span className="font-medium text-sm">{review.user.username}</span> */}
                        
                        <div className="flex items-center gap-0.5">


                            {Array.from({ length: review.star }).map(
                                (_, index) => (
                                    <Star key={index} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                )
                            ) }

                        
                        </div>
                        <p className="text-sm text-muted-foreground">{review.createdAt}</p>
                                                       
                    </div>

                    {
                        review.user && (
                            <p className="text-sm font-bold">{review.user.name}</p>
                        )
                    }

                    {review.comment && (
                        <p className="text-sm">{review.comment}</p>
                    )}
                </div>

            ))}



        </div>
    </div>
  )
}

export default BookDetailPage;