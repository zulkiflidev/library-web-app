//import React from 'react'
import { useParams } from 'react-router-dom';

import useBookDetail from '../../hooks/useBookDetail'

import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge';
//import { isPending } from '../../hooks/useBorrowBook'
import { Button } from '@/components/ui/button';

import useBorrowBook from '../../hooks/useBorrowBook';
// import { Avatar, AvatarFallback, 
//     // AvatarImage 
// } from '@/components/ui/avatar';
// import defaultPhoto from '@/assets/DefaultPhoto.png';
// import type { Book } from '@/types';
// import BookCard from '@/features/books/BookCard';
// import useBooks from '@/hooks/useBooks';
import { ArrowLeft } from 'lucide-react';
// import Breadcrumb from '@/components/common/Breadcrumb'

import { useNavigate } from 'react-router-dom';
import NoBookCoverImage from '@/assets/noBookCoverImage.webp';


function PreviewAdminPage() {
  
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, isError } = useBookDetail(id!);
  const { mutate: borrowBook, isPending } = useBorrowBook(book?.id ?? 0);

  const navigate = useNavigate();

//   const { data: books, 
//     // isLoading: isBooksLoading, 
//     // isError: isBooksError 
//   } = useBooks( book?.categoryId ?? 0, 5);


  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: Failed to load book details</div>
  if (!book) return <div>Book not found</div>

  return (
    <div className="space-y-8 px-4 md:px-20 mt-10">

        {/* <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Books', href: '/' },
            { label: book.title },
        ]} /> */}
        
        <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-16 h-16 mr-4" />
            <p className="font-bold text-xl">
                Preview Book
            </p>
        </Button>

        <div className="flex flex-col  md:flex-row gap-8">        
            <img src={book!.coverImage ? book!.coverImage : NoBookCoverImage} alt={book!.title} 
                 className="self-center justify-center items-center w-48 h-64 
                            object-cover rounded-lg shadow"    />
        
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
                        <p className="font-bold text-sm">179</p>
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
                    >

                        {isPending ? 'Loading...' : (
                            book!.availableCopies === 0 ? 'Out of Stock' : 'Add to Cart'
                        )}

                    </Button>

                    <Button 
                        variant= "default"
                        className="bg-[#1C65DA] w-1/2 md:w-full rounded-xl"
                        disabled={book!.availableCopies === 0 || isPending}
                        onClick={() => borrowBook(7)}>

                            {isPending ? 'Loading...' : (
                                book!.availableCopies === 0 ? 'Out of Stock' : 'Borrow Book'
                            )}

                    </Button>

                </div>                            
            </div>
        </div>     

    </div>
  )
}

export default PreviewAdminPage;