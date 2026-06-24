// import React from 'react'

import BookCard from './BookCard';
import useBooks from '@/hooks/useBooks';

import type { Book } from '@/types';


function HomePage() {

  const { data: books, isLoading, isError } = useBooks();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: Failed to load books</div>;
  }


  return (
    <div className="space-y-6">

      <div className="grid grid-cols-2  md:grid-cols-3  lg:grid-cols-4 gap-4">

        { books?.map(
          (book: Book) => (
            <BookCard key={book.id} book={book} />
          )
        )}

      </div>
    </div>
  )
}

export default HomePage




