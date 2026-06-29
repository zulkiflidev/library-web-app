//import React from 'react'
import { useParams } from 'react-router-dom';

import useBookDetail from '../../hooks/useBookDetail'

import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge';
//import { isPending } from '../../hooks/useBorrowBook'
import { Button } from '@/components/ui/button';

import useBorrowBook from '../../hooks/useBorrowBook';
import { Avatar, AvatarFallback, 
    // AvatarImage 
} from '@/components/ui/avatar';
import defaultPhoto from '@/assets/DefaultPhoto.png';
import type { Book } from '@/types';
import BookCard from '@/features/books/BookCard';
import useBooks from '@/hooks/useBooks';

import Breadcrumb from '@/components/common/Breadcrumb'
import NoBookCoverImage from '@/assets/noBookCoverImage.webp';

import { useAddToCart } from '@/hooks/useCart';
// import type { Book } from '@/types/book';

function BookDetailPage() {
  
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, isError } = useBookDetail(id!);
  const { mutate: borrowBook, isPending } = useBorrowBook( book?.id ?? 0, 7 ); //default 7 hari
  const { mutate: atcBook, isPending: isAtcPending } = useAddToCart( book?.id ?? 0 ); //default 7 hari

  const { data: books, 
    isLoading: isBooksLoading, 
    isError: isBooksError 
  } = useBooks( book?.categoryId ?? 0, 5);


  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: Failed to load book details</div>
  if (!book) return <div>Book not found</div>

  if (isBooksLoading) return <div>Loading...</div>
  if (isBooksError) return <div>Error: Failed to load book details</div>
  if (!book) return <div>Book not found</div>

  if (isAtcPending) return <div>Loading...</div>
  
  return (
    <div className="space-y-8 px-4 md:px-20 mt-2">
        <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Books', href: '/' },
            { label: book.title },
        ]} />

        <div className="flex flex-col  md:flex-row gap-8">        
            <img src={book!.coverImage ? book!.coverImage : NoBookCoverImage} 
                 alt={book!.title} 
                 className="self-center md:self-start justify-center items-center w-48 h-64 
                            object-cover rounded-lg shadow"    
            />
        
            <div className="flex-1 space-y-3">
                
                <Badge variant="outline">{book.category?.name}</Badge>
                <h1 className="text-2xl font-semibold">{book.title}</h1>
                <p className="text-muted-foreground">{book.author.name}</p>

                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{book.rating}</span>
                   
                    {/* <span className="text-muted-foreground text-sm">({book.ratingCount})</span> */}
                
                </div>
                

                {/* --mungkin nanti diperlukan...
                <p className="text-sm">
                    Available Stock: <span className="font-semibold"></span>
                </p> */}

                <div className="flex flex-row gap-15">
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-sm">320</p>
                        <p>Page</p> 
                    </div>
                    
                    <div className="flex flex-col gap-2 border-l px-5">
                        <p className="font-bold text-sm">212</p>
                        <p>Rating</p> 
                    </div>
                    
                    <div className="flex flex-col gap-2 border-l px-5">
                        <p className="font-bold text-sm"> {book.reviewCount}</p>
                        <p>Reviews</p> 
                    </div>

                </div>

                <hr className="border-slate-300" />

                <p className="text-sm font-bold"> Description </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{book!.description}</p>

                {/* <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm 
                                       font-medium disabled:opacity-50" disabled={book.availableCopies === 0}>
                    {book.availableCopies === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button> */}

                {/* <div className="flex gap-4 justify-center md:justify-start items-center w-full md:w-1/4"> */}
                <div className="fixed bottom-0 left-0 w-full z-50 bg-white p-4 shadow-lg md:static md:w-1/4 
                                md:p-0 md:shadow-none flex gap-4 justify-center 
                                md:justify-start items-center">

                   <Button 
                    variant= "outline"
                    className="w-1/2 md:w-full rounded-xl"
                    disabled={book!.availableCopies === 0 || isPending}
                    onClick={() => atcBook(  )}
                    >

                        {isPending ? 'Loading...' : (
                            book!.availableCopies === 0 ? 'Out of Stock' : 'Add to Cart'
                        )}

                    </Button>

                    <Button 
                        variant= "default"
                        className="bg-[#1C65DA] w-1/2 md:w-full rounded-xl"
                        disabled={book!.availableCopies === 0 || isPending}
                        onClick={() => borrowBook( )}>

                            {isPending ? 'Loading...' : (
                                book!.availableCopies === 0 ? 'Out of Stock' : 'Borrow Book'
                            )}

                    </Button>

                </div>                            
            </div>
        </div>


        <div className="space-y-4 px-4">
            <h2 className="text-2xl font-semibold">Review</h2>
            
            <div className="flex items-center gap-1 px-5">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className=" font-bold">{book.rating}</span>                   
                    <span className="font-bold text-sm">({book.reviewCount} Ulasan)</span>
                
            </div>

            {book!.reviews?.length === 0 && (
                <p className="text-sm text-muted-foreground">No reviews yet.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                {book!.reviews?.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4 space-y-1">
                        <div className="flex items-center gap-2">
                            
                            {/* <span className="font-medium text-sm">{review.user.username}</span> */}
                                                                                                        
                        </div>

                        <div className="flex flex-row gap-2">
                            <Avatar className="w-12 h-12">
                                {/* <AvatarImage src={book?.reviews ?? undefined} /> */}
                                <AvatarFallback>
                                    <img src={defaultPhoto} 
                                        alt="default photo" 
                                        className="w-full h-full rounded-full object-cover" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1">
                            
                                {
                                    review.user && (
                                        <p className="text-sm font-bold">{review.user.name}</p>
                                    )
                                }

                                <p className="text-sm text-muted-foreground">
                                {
                                    new Date(review.createdAt).toLocaleDateString('id-ID',{
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })
                                    .replace(/\s*pukul\s*/i, ', ')
                                }

                            </p>


                            </div>
                        </div>

                        <div className="flex items-center gap-0.5 pt-4">

                            {Array.from({ length: review.star }).map(
                                (_, index) => (
                                    <Star key={index} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                )
                            ) }
                        
                        </div>


                        {review.comment && (
                            <p className="text-sm">{review.comment}</p>
                        )}
                    </div>

                ))}
            </div>



        </div>


        <div>
            
            <div className="space-y-4">

                <h2 className="text-2xl font-semibold">Related Books</h2>
                {isLoading && <div>Loading...</div>}
                {isError && <div>Error: Failed to load books</div> }
                <div className="grid grid-cols-2  md:grid-cols-3  lg:grid-cols-5 gap-4">

                { books?.map(
                    
                    (book: Book) => (
                    <BookCard key={book.id} book={book} />
                    )
                )}

                </div>

            </div>


        </div>
    </div>
  )
}

export default BookDetailPage;