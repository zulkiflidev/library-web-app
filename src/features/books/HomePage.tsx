// import React from 'react'

import BookCard from './BookCard';
import { Button } from '@/components/ui/button';
//import { useState } from 'react';
//import useBooks from '@/hooks/useBooks';
import type { AuthorItem, Book } from '@/types';
import useCategories from '@/hooks/useCategories';
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { setCategoryId } from '@/features/books/uiSlice';
import type { RootState } from '@/store';
// import type { AppDispatch } from '@/store';
import { useNavigate } from 'react-router-dom';
import featuredImage from '@/assets/featuredImage.png'

import useRecomendedBooks from '@/hooks/useRecommendedBooks';
import usePopularAuthors from '@/hooks/usePopularAuthors';
import authorDefaultPhoto from '@/assets/DefaultPhoto.png';

//==Icon for Menu
import iconFiction from '@/assets/menu/fiction.png';
import iconEducation from '@/assets/menu/education.png';
import iconFinance from '@/assets/menu/finance.png';
import iconNonFiction from '@/assets/menu/non-fiction.png';
import iconScience from '@/assets/menu/science.png';
import iconSelfImprovement from '@/assets/menu/self-improvement.png';
import bookIcon from '@/assets/BookIcon.svg';

// import NoBookCoverImage from '@/assets/noBookCoverImage.webp';


function HomePage() {

  // const dispatch = useDispatch<AppDispatch>();
  const categoryId = useSelector( (state: RootState) => state.ui.categoryId);

  // const { data: books, isLoading, isError } = useBooks();
  const { data: books, isLoading, isError } = useRecomendedBooks();
  const { data: popularAuthors } = usePopularAuthors();
  const { data: categoriesData } = useCategories();
  const navigate = useNavigate();

  const ALLOWED_CATEGORIES_WITH_ICONS: Record<string, string> = {
    'Fiction': iconFiction,
    'Education': iconEducation,
    'Finance': iconFinance,
    'Non-Fiction': iconNonFiction,
    'Science': iconScience,
    'Self-Improvement': iconSelfImprovement,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: Failed to load books</div>;
  }


  return (
    <div className="space-y-6 px-4 md:px-16 bg-[#fdfdfd]">

      <div className="w-full rounded-sm overflow-hidden shadow-sm">
        <img
          src={featuredImage}
          alt="Featured"
          className="w-full aspect-video h-25 md:h-64 md:h-80 
                     object-cover object-center"
        />
      </div>

           
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-1 justify-start items-center">
        {
          categoriesData?.categories
          .filter((category) =>
            Object.prototype.hasOwnProperty.call(ALLOWED_CATEGORIES_WITH_ICONS, category.name)
          )
          .map((categories) => {
            const iconSrc = ALLOWED_CATEGORIES_WITH_ICONS[categories.name];

            return (
              <Button
                key={categories.id}
                variant={categoryId === categories.id ? 'default' : 'ghost'}
                onClick={
                  () => navigate(`/category?categoryId=${categories.id}`)
                }
                 
                className="flex flex-col items-center justify-start gap-1 md:gap-2 
                          h-auto p-2 pt-1 md:p-4 min-w-[110px] shadow-xs mx-0 md:mx-1
                          bg-white rounded-xl"
              >
                <div className="flex flex-col gap-0.5 md:gap-1 items-center">
                  {
                    iconSrc && (
                      <img
                        src={iconSrc}
                        alt={`${categories.name} icon`}
                        className="w-36 h-16 md:h-24 object-contain"
                      />
                    )
                  }

                  <span className="text-xs font-medium text-center md:text-left">
                    {categories.name}
                  </span>
                </div>
              </Button>
            );
          })}
      </div>


      {/* Rekomendasi Buku */}
      <div className="space-y-4">

        <h2 className="text-xl font-bold"> Recomendation</h2>
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

      <div className="space-y-4">

        <h2 className="text-xl font-bold">Popular Authors</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 cursor-pointer">
            {
                popularAuthors?.map(

                    (author:AuthorItem) => (
                      
                        <div key={author.id} className="border rounded-lg p-4 space-y-1"
                             onClick={
                                () => navigate(`/author/${author.id}`)
                             }
                        >
 
 
                            {/* <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                             {author.name.charAt(0)}
                            </div> */}

                            <img
                              src={authorDefaultPhoto}
                              alt={author.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />

                            <h3 className="font-semibold text-sm">{author.name}</h3>
                            
                            {/* <p className="text-xs text-muted-foreground line-clamp-2">
                            
                                {author.bio ?? 'No bio available'}
                                
                            </p> */}
                            
                            <div className="flex flex-row">
                                <img src={bookIcon} alt="Book Icon" className="w-4 h-4 mr-1" />
                                <p className="text-xs text-muted-foreground">{author.bookCount} books</p>
                            </div>
                        </div>

                    )

                )

            }


        </div>
      </div>

    </div>
  )
}

export default HomePage




