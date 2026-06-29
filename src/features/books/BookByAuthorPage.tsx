//import React from 'react'

import { useParams } from 'react-router-dom';
import useAuthorBooks from '@/hooks/useAuthorBooks';
import BookCard from './BookCard';
import authorDefaultPhoto from '@/assets/DefaultPhoto.png';

import bookIcon from '@/assets/BookIcon.svg';
import Breadcrumb from '@/components/common/Breadcrumb';

// import NoBookCoverImage from '@/assets/noBookCoverImage.webp';


function BookByAuthorPage() {
  
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useAuthorBooks(id!);

  if (isLoading) return <div>Loading....</div>;
  if (isError) return <div>Failed to load book list!</div>;  
  if (!data) return null;

  return (
    <div className="space=y-6 px-4 md:px-20">

        <Breadcrumb items={
            [
                { label: 'Home', href: '/' },
                { label: 'Book by Author' },
            ]
        } 
        />

        <div className="flex items-center gap-4 py-10">

            <img src={authorDefaultPhoto} alt={data.author.name}
                 className="w-16 h-16 rounded-full object-cover" />

            <div>
                 <h1 className="text-2xl font-bold">{data.author.name}</h1>
                 <div className="flex flex-row gap-2 items-center">
                    <img src={bookIcon} alt="Book Icon" className="w-4 h-4 mr-1" />
                    <p className="text-sm text-muted-foreground">{data.bookCount} Books</p>
                 </div>
                 { 
                    data.author.bio && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {/* {data.author.bio} */}
                        </p>
                    )
                 }

            </div>
            
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                 {
                    data.books.map(
                        (book) => (
                            <BookCard key={book.id} book={book} />
                        )
                    )
                 }

        </div>

    </div>
  )
}

export default BookByAuthorPage