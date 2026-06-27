//import React from 'react'

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import useCategories from '@/hooks/useCategories';
import useAuthors from '@/hooks/admin/useAuthors';
import { useAddBook, useEditBook } from '@/hooks/admin/useAdminBooksMutation';

import type { Book } from '@/types';


interface BookFormModalProps {
    open: boolean;
    onClose: () => void;
    book?: Book | null;
}


function BookFormModal(
    {
        open,
        onClose,
        book
    
    }: BookFormModalProps
) {
  
  const { data: categoriesData } = useCategories();
  const { data: authorsData } = useAuthors();
 
  const { mutate: addBook, isPending: isAdding } = useAddBook();
  const { mutate: editBook, isPending: isEditing } = useEditBook();

  const [title, setTitle] = useState('')
  const [isbn, setIsbn] = useState('')
  const [description, setDescription] = useState('')
  const [publishedYear, setPublishedYear] = useState('')
  const [totalCopies, setTotalCopies] = useState('')
  const [availableCopies, setAvailableCopies] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [authorName, setAuthorName] = useState('')
  
  
//   isi from jika lagi di mode edit
  useEffect(
    () => {

        if (book){
            setTitle(book.title)
            setIsbn(book.isbn)
            setDescription(book.description)
            setPublishedYear(  String(book.publishedYear) )
            setTotalCopies( String(book.totalCopies) )
            setAvailableCopies( String(book.availableCopies) )
            setCategoryId( String(book.category?.id) ?? '' )
            setAuthorId( String(book.author.id) )
            setAuthorName(book.author.name)

        }
        else
        {
            setTitle(''); setIsbn(''); setDescription('')
            setPublishedYear(''); setTotalCopies(''); setAvailableCopies('')
            setCategoryId(''); setAuthorId(''); setAuthorName('')
        }
    }, [book, open]
  );


  const handleSubmit = () => {

    const payload = {

        title, isbn, description,
        publishedYear: Number(publishedYear),
        totalCopies: Number(totalCopies),
        availableCopies: Number(availableCopies),
        categoryId: Number(categoryId),
        authorId: Number(authorId),
        authorName,


    }

    if (book) {
        editBook(
            {
                id: book.id,
                payload
            },
            {
                onSuccess: () => {
                    onClose();
                }
            
            }
        );
    }

    else{
        addBook(
            payload,
            {
                onSuccess: () => {
                    onClose();
                }
            }
        )
    }
  }

  const isPending = isAdding || isEditing;


  return (
    <div>
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">

                <DialogHeader>

                    <DialogTitle>

                        {book ? 'Edit Book' : 'Add Book'}


                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-3">
                    <Input placeholder="Judul" value={title} 
                    onChange={
                        (e) => setTitle(e.target.value)
                    } />
                    
                    <Input placeholder="ISBN" value={isbn} 
                    onChange={
                        (e) => setIsbn(e.target.value)
                    } />
                    
                    <Input placeholder="Deskripsi" value={description} 
                    onChange={
                        (e) => setDescription(e.target.value)
                    } />

                    <Input placeholder="Tahun Terbit" type="number" value={publishedYear} 
                        onChange={
                            (e) => setPublishedYear(e.target.value)
                        } 
                    />
                    
                    <Input placeholder="Total Kopian" type="number" value={totalCopies} 
                        onChange={
                            (e) => setTotalCopies(e.target.value)
                        } 
                    />
                    
                    <Input placeholder="Kopian Tersedia" type="number" value={availableCopies} 
                        onChange={
                            (e) => setAvailableCopies(e.target.value)
                        } 
                    />

                    {/* Pilihan Kategori Buku */}
                    <select className="w-full border rounded-md px-3 py-2 text-sm bg-background" 
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option value="">Pilih Kategori</option>
                        {
                            categoriesData?.categories.map(
                                (cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                )
                            )
                        }      
                    </select>

                    {/* Pilih Author */}
                    <select className="w-full border rounded-md px-3 py-2 text-sm bg-background" 
                            value={authorId}
                            onChange={

                                (e) => {
                                    setAuthorId(e.target.value)
                                    const author = authorsData?.authors.find(
                                        (a) => String(a.id) === e.target.value
                                    )
                                    if (author) setAuthorName(author.name)
                                }

                            }
                    >
                        <option value="">Pilih Author</option>
                        {
                            authorsData?.authors.map(
                                (author) => (
                                    <option key={author.id} value={author.id}>
                                        {author.name}
                                    </option>
                                )
                            )
                        }      
                    </select>


                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>Cancel</Button>

                        <Button disabled={isPending} onClick={handleSubmit}>
                            {
                                isPending ? "Saving..." : book ? 'Update' : 'Add'
                            }
                        </Button>


                    </div>


                </div>



            </DialogContent>



        </Dialog>

    </div>
  )
}

export default BookFormModal