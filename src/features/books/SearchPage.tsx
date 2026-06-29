// src/features/books/pages/SearchPage.tsx
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { setCategoryId } from '@/features/books/uiSlice';
import useSearchBooks from '@/hooks/useSearchBooks';
import useCategories from '@/hooks/useCategories';

import BookCard from './BookCard';

import { Button } from '@/components/ui/button';
import type { Book } from '@/types';

function SearchPage() {
  const dispatch = useDispatch<AppDispatch>();
  const search = useSelector((state: RootState) => state.ui.search);
  const categoryId = useSelector((state: RootState) => state.ui.categoryId);

  const { data: books, isLoading, isError } = useSearchBooks({ 
    q: search, 
    categoryId 
  });
  const { data: categoriesData } = useCategories();

  return (
    <div className="space-y-6 px-4 md:px-16">

      <div className="space-y-1">

        <h2 className="text-xl font-bold">
          Search results for: <span className="text-blue-600">"{ search }"</span>
        </h2>
        
        <p className="text-sm text-muted-foreground">
          { books?.length ?? 0  } books found
        </p>

      </div>

      <div className="flex flex-wrap gap-2">
        
        <Button
          variant={categoryId === null ? 'default' : 'outline'}
          size="sm"
          onClick={            
            () => dispatch( setCategoryId(null))

          }
        >
          All

        </Button>

        {
            categoriesData?.categories.map((cat) => (
          
                <Button
                    key={cat.id}
                    variant={categoryId === cat.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={
                        () => dispatch( setCategoryId(cat.id) )                    
                    }
                >
                    {cat.name}
                
                </Button>
            ))
        }
      </div>

      {
        isLoading && <div>Loading...</div>
      }
      {
         isError && <div>Failed to load results.</div>
      }
      {
        !isLoading && books?.length === 0 && (
           <div className="text-muted-foreground">No books found.</div>
        )
      }

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {
            books?.map((book: Book) => (
            
                <BookCard key={book.id} book={book} />
            
            ))
        }
      </div>

    </div>
  );
}

export default SearchPage;