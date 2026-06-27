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
import authorDefaultPhoto from '@/assets/authorDefaultPhoto.png';

//==Icon for Menu
import iconFiction from '@/assets/menu/fiction.png';
import iconEducation from '@/assets/menu/education.png';
import iconFinance from '@/assets/menu/finance.png';
import iconNonFiction from '@/assets/menu/non-fiction.png';
import iconScience from '@/assets/menu/science.png';
import iconSelfImprovement from '@/assets/menu/self-improvement.png';



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
    <div className="space-y-6 px-4 md:px-16">

      <div className="w-full rounded-xl overflow-hidden">
        <img
          src={featuredImage}
          alt="Featured"
          className="w-full h-64 md:h-80 object-cover"
        />
      </div>

      {/* Menu Kategori */}
      <div className="flex flex-wrap gap-1 justify-center items-center">
      {
        categoriesData?.categories
          .filter(
            (category) => 
              Object.prototype.hasOwnProperty.call(ALLOWED_CATEGORIES_WITH_ICONS, category.name)
          )
          .map(
            (categories) => {
              const iconSrc = ALLOWED_CATEGORIES_WITH_ICONS[categories.name];

              return (
                <Button key={categories.id} 
                   
                  variant={categoryId === categories.id ? 'default' : 'ghost'} 
                  onClick={() => navigate(`/category?categoryId=${categories.id}`)}
                   
                  className="flex flex-col items-center justify-center gap-2 h-auto p-4 min-w-[110px]"
                >
                  { 
                    iconSrc && (
                      <img src={iconSrc} 
                        alt={`${categories.name} icon`}                          
                        className="w-36 h-24 object-contain" 
                      />
                    )              
                  }
                  
                  <span className="text-xs font-medium text-center"> {categories.name} </span>
                </Button>
              )
            }            
          )
      }
      </div>

      {/* Rekomenadisi Buku */}
      <div className="space-y-4">

        <h2 className="text-xl font-bold"> Recomended Books </h2>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error: Failed to load books</div> }
        <div className="grid grid-cols-2  md:grid-cols-3  lg:grid-cols-4 gap-4">

          { books?.map(
            (book: Book) => (
              <BookCard key={book.id} book={book} />
            )
          )}

        </div>

      </div>

      <div className="space-y-4">

        <h2 className="text-xl font-bold">Popular Authors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {
                popularAuthors?.map(

                    (author:AuthorItem) => (
                      
                        <div key={author.id} className="border rounded-lg p-4 space-y-1">
 
 
                            {/* <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                             {author.name.charAt(0)}
                            </div> */}

                            <img
                              src={authorDefaultPhoto}
                              alt={author.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />

                            <h3 className="font-semibold text-sm">{author.name}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-2">{author.bio ?? 'No bio available'}</p>
                            <p className="text-xs text-muted-foreground">{author.bookCount} books</p>

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




