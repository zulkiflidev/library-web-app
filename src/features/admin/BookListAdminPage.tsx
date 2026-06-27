//import React from 'react'

import { useState } from 'react';
import useAdminBooks from '@/hooks/admin/useAdminBooks';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';


import { useDeleteBook } from '@/hooks/admin/useAdminBooksMutation';
import BookFormModal from './BookFormModal';
import type { Book } from '@/types';



function BookListAdminPage() {

  const [q, setQ] = useState('');
  const { data, isLoading, isError } = useAdminBooks(q);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const { mutate: deleteBook } = useDeleteBook();
  

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to Load Books Data</div>



  return (
    <div className="space-y-6">
        
        <h1 className="text-2xl font-bold">Book List</h1>

        <Input placeholder="Find Book Title..." value={q} 
               onChange={ (e) => setQ(e.target.value)}
               className="max-w-sm" 
        />
        
        <div className="border rounded-lg overflow-hidden">

            <Button onClick={
                () => {
                    setModalOpen(true);
                    setSelectedBook(null);
                
                }
            }>
                + Add Book
            </Button>

            <table className="w-full text-sm">

                <thead className="bg-muted">
                    <tr>
                        <th className="text-left -p-3">Cover</th>
                        <th className="text-left -p-3">Title</th>
                        <th className="text-left -p-3">Author</th>
                        <th className="text-left -p-3">Category</th>
                        <th className="text-left -p-3">Stock</th>
                        <th className="text-left -p-3">Rating</th>
                    
                    </tr>
                </thead>

                <tbody>
                    {
                        data?.books.map( (book) => (
                            <tr key={book.id} className="border-t"> 
                                <td className="p-3">

                                    <img src={book.coverImage ?? '/placeholder.png'} alt={book.title}
                                    className="w-10 h-14 object-cover rounded"
                                    />
                                </td>

                                <td className="p-3 font-medium"> {book.title}   </td>

                                <td className="p-3 font-medium"> {book.author.name}   </td>

                                <td className="p-3">

                                    <Badge variant="outline">
                                        {book.category?.name}
                                    </Badge>

                                </td>

                                <td className="p-3">
                                    {book.availableCopies}/{book.totalCopies}
                                </td>

                                <td className="p-3">
                                    {book.rating}
                                </td>

                                <td className="p-3">
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline"
                                                onClick={
                                                    () => {
                                                        setModalOpen(true);
                                                        setSelectedBook(book);

                                                    }
                                                }>
                                        Edit            
                                        </Button>

                                        <Button size="sm" variant="destructive"
                                                onClick={
                                                    () => { deleteBook(book.id)}
                                                }>
                                        Delete        
                                        </Button>
                                    </div>


                                </td>
                                
                            
                            </tr>
                        ))
                    
                    }


                </tbody>

            </table>
        </div>


        <BookFormModal 
            open={modalOpen} 
            onClose={
                () =>{
                    setModalOpen(false);
                }
            }
            book={
                selectedBook
            }
        />


    </div>
  )
}

export default BookListAdminPage