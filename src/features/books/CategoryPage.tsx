//import React from 'react'


import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import useBooks from '@/hooks/useBooks';
import useCategories from "@/hooks/useCategories";

import type { AppDispatch  } from "@/store";
import { useDispatch } from "react-redux";
import { setCategoryId } from "@/features/books/uiSlice";

import BookCard from '@/features/books/BookCard';
import { Checkbox  } from "@/components/ui/checkbox";

import type { Book } from "@/types";

function CategoryPage() {

    const [searchParams] = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();

    const { data: categoriesData } = useCategories();
    const { data: books, isLoading, isError } = useBooks();

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    

    useEffect(
        () => {
            const id = searchParams.get('categoryId');
            if (id){
                const numId = Number(id);
                setSelectedIds([numId]);
                dispatch(setCategoryId(numId));
            
            }
        }, [searchParams, dispatch]
    );

    const handleCheck = (id: number, checked: boolean) => {
        let newIds: number[];
        if (checked) {
            newIds = [...selectedIds, id];
        } 
        else {
            newIds = selectedIds.filter((selectedId) => selectedId !== id);
        }
        setSelectedIds(newIds);
        dispatch(setCategoryId( newIds.length > 0 ? newIds[0] : null       ));
        
    }

    return (
    <div className="flex gap-8">

        <div className="w-48 shrink-0 space-y-3">

            <h2 className="text-2xl font-semibold">Categories</h2>
            {
                categoriesData?.categories.map(
                    (category) => (

                        <div key={category.id} className="flex items-center gap-2">
                            <Checkbox 
                                checked={selectedIds.includes(category.id)}
                                // onChange={(checked) => handleCheck(category.id, checked)}
                                onCheckedChange={ (checked) => handleCheck(category.id, !!checked)}
                            />
                            <label htmlFor={String(category.id)} className="text-sm cursor-pointer">
                                
                                {category.name}
                            
                            </label>

                        </div>                            
                    )
                        
                )
            }

        </div>

        <div className="flex-1 space-y-4">

            <h1 className="text-2xl font-bold">Category Page</h1>
            {
                isLoading && <div>Loading...</div>
            }
            {
                isError && <div>Error: Failed to load books</div>
            }

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {
                    books?.map(
                        (book : Book) => (
                            <BookCard key={book.id} book={book} />
                        )
                    )
                }

            </div>

        </div>

    </div>
  )
}

export default CategoryPage