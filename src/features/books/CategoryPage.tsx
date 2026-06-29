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
import Breadcrumb from "@/components/common/Breadcrumb";

// import NoBookCoverImage from '@/assets/noBookCoverImage.webp';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Star } from 'lucide-react'


function CategoryPage() {


    const [searchParams] = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();

    const { data: categoriesData } = useCategories();
    const { data: books, isLoading, isError } = useBooks();

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const [isOpen, setOpen] = useState(false); //untuk filter
    

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
    <div className="flex flex-col gap-8 px-4 md:px-20">

        <Breadcrumb items={
            [
                { label: 'Home', href: '/' },
                { label: 'Book Category' },
            ]
        } 
        />        

        <h2 className="text-2xl font-bold">Book List</h2>    
        <div className="flex md:hidden justify-between bg-white rounded-xl shadow-xs p-4 items-center gap-4">
            
            <p className="font-bold">FILTER</p> 
            
            <Button variant="ghost" onClick={() => setOpen(!isOpen)}>   
                <Filter className="w-5 h-5" />
            </Button>

        </div>

        {isOpen && categoriesData?.categories && (
            
            <div className="flex md:hidden flex-col gap-3">  
                
                {categoriesData.categories.map((category) => {

                    const idString = String(category.id);
                    
                    return (
                        <div key={category.id} className="flex items-center gap-3 py-1.5 
                                                          active:bg-gray-50 rounded">

                            <Checkbox 
                                id={idString}  
                                checked={selectedIds.includes(category.id)}
                                onCheckedChange={(checked) => handleCheck(category.id, !!checked)}
                            />

                            <label 
                                htmlFor={idString} 
                                className="text-sm font-medium select-none min-h-[24px] 
                                           flex items-center flex-1 cursor-pointer"
                            >
                                {
                                  category.name
                                }
                            </label>
                        </div>
                    );

                })}

            </div>
        )}

        <div className = "flex gap-4">
        
            <div className="flex flex-col gap-4">
                <div className="hidden md:flex flex-col w-48 space-y-3">
                    {/* <h2 className="text-2xl font-semibold">Categories</h2> */}
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

                <div className="hidden md:flex flex-col">

                    <hr />

                    <div className="flex items-center gap-1 pt-5">
                        <Checkbox 
                            // checked={ selectedIds.includes(category.id) }
                            // onChange={(checked) => handleCheck(category.id, checked)}
                            // onCheckedChange={  (checked) => handleCheck(category.id, !!checked) }
                        />

                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium"> 5 </span>
                    </div>

                    <div className="flex items-center gap-1 pt-5">
                        <Checkbox 
                            // checked={ selectedIds.includes(category.id) }
                            // onChange={(checked) => handleCheck(category.id, checked)}
                            // onCheckedChange={  (checked) => handleCheck(category.id, !!checked) }
                        />                        
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium"> 4 </span>
                    </div>

                    <div className="flex items-center gap-1 pt-5">
                        <Checkbox 
                            // checked={ selectedIds.includes(category.id) }
                            // onChange={(checked) => handleCheck(category.id, checked)}
                            // onCheckedChange={  (checked) => handleCheck(category.id, !!checked) }
                        />                        
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium"> 3 </span>
                    </div>

                    <div className="flex items-center gap-1 pt-5">
                        <Checkbox 
                            // checked={ selectedIds.includes(category.id) }
                            // onChange={(checked) => handleCheck(category.id, checked)}
                            // onCheckedChange={  (checked) => handleCheck(category.id, !!checked) }
                        />                        
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium"> 2 </span>
                    </div>

                    <div className="flex items-center gap-1 pt-5">
                        <Checkbox 
                            // checked={ selectedIds.includes(category.id) }
                            // onChange={(checked) => handleCheck(category.id, checked)}
                            // onCheckedChange={  (checked) => handleCheck(category.id, !!checked) }
                        />                        
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium"> 1 </span>
                    </div>

                </div>
            </div>

            <div className="flex-1 space-y-4">

                {/* <h1 className="text-2xl font-bold"></h1> */}
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

    </div>
  )
}

export default CategoryPage