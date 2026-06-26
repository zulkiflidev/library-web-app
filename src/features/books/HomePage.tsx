// import React from 'react'

import BookCard from './BookCard';
import { Button } from '@/components/ui/button';
//import { useState } from 'react';
import useBooks from '@/hooks/useBooks';
import type { Book } from '@/types';

import useCategories from '@/hooks/useCategories';
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// import { setCategoryId } from '@/features/books/uiSlice';

import type { RootState } from '@/store';
// import type { AppDispatch } from '@/store';

import { useNavigate } from 'react-router-dom';




function HomePage() {

  // const dispatch = useDispatch<AppDispatch>();
  const categoryId = useSelector( (state: RootState) => state.ui.categoryId);

  const { data: books, isLoading, isError } = useBooks();
  const { data: categoriesData } = useCategories();

  const navigate = useNavigate();


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: Failed to load books</div>;
  }


  return (
    <div className="space-y-6">

      {
        categoriesData?.categories.map(
          (categories) => (
              <Button key={categories.id} 
                      size="sm" 
                      variant={
                       categoryId === categories.id ? 'default' : 'outline'
                      } 
                      // onClick={ () => dispatch( setCategoryId(categories.id)) }
                      onClick={ () => navigate(`/category?categoryId=${categories.id}`) }
                      >

                {categories.name}

              </Button>
          )
        )
      }

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




