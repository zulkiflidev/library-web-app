import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// import ReviewModal from '@/components/common/ReviewModal';
// import useLoans from '@/hooks/useLoans';
import useBooks from '@/hooks/admin/useAdminBooks';
// import Breadcrumb from '@/components/common/Breadcrumb';

import ProfileTabs from '@/components/common/ProfileTabs'
import { Star } from 'lucide-react';

//import useNavigate from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDeleteBook } from '@/hooks/admin/useAdminBooksMutation';
import { Input } from '@/components/ui/input';

import NoBookCoverImage from '@/assets/noBookCoverImage.webp';
import { MoreHorizontal } from 'lucide-react';

import type { Book } from '@/types'

function BookListAdminPage() {

   const navigate = useNavigate();
   const { mutate: deleteBook } = useDeleteBook();

   const[q, setQ] = useState('');   
   const [debounceQ, setDebounceQ] = useState(''); 
   const [status, setStatus] = useState('all');

   const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

   useEffect(() => {
        
        const timer = setTimeout(
            () =>{
                setDebounceQ(q);
            }, 500
        );       
        return () => clearTimeout(timer);

   }, [q] )

   

   const { data, isLoading, isError } = useBooks( debounceQ, status );

//    const [isOpen, setIsOpen] = useState(false);
   const [isOpenBookId, setOpenBookId] = useState<number | null>(null);


    useEffect(() => {
        function handleClickOutside() {
            setOpenBookId(null);
        }

        if (isOpenBookId !== null) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpenBookId]);


    function handleConfirmDelete() {
       if (bookToDelete) {
           deleteBook(bookToDelete.id);
           setBookToDelete(null);
       }
   }

  return (
    <div  className="space-y-6 px-4 md:px-20">
    
        {/* <Breadcrumb items={
            [
                { label: 'Home', href: '/' },
                { label: 'Book List' },
            ]
        } 
        /> */}
        
        <ProfileTabs variant="admin" />

        <h1 className="text-2xl font-bold">Book List</h1>

        <div className="flex flex-col gap-2 w-full md:w-1/2">
            <Button variant="default" className="w-full md:w-1/3 
                    bg-[#1C65DA] rounded-xl" 
                    onClick={ () => navigate('/admin/books/add') }>
                Add Book
            </Button>

            <Input placeholder="Search Books..." value={q} onChange={ (e) => setQ(e.target.value)}
                className="max-w-sm"
            />
        </div>

        <div className="flex gap-2 ">
            {
                ['all', 'available', 'borrowed', 'returned'].map(
                    (s) => (
                        <Button key={s} variant={status === s ? 'default' : 'outline'} 
                                size="sm" 
                            onClick={ 
                                () => setStatus(s) 
                                //() => setDebounceQ(s)
                            }
                            className="rounded-xl"    
                        >
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </Button>                    
                    )
                )            
            }

        </div>


        {data?.books.length  === 0 && (
            <p className="text-muted-foreground text-sm">No Books found.</p>
        )}

        { 
            isLoading ? (
                <tr>
                    <td colSpan={5} className="p-3 text-center text-muted-foreground">Loading...</td>
                </tr>
            ) : isError ? (                
                <tr>
                    <td colSpan={5} className="p-3 text-center text-destructive">
                        Failed to load users.
                    </td>
                </tr>
            ) : (
                 
            <div className="space-y-4">
                {
                    data?.books.map(
                        (book) => (

                            <div key={book.id} className="border rounded-lg p-4 flex w-full">
                                                             
                                <div className="flex flex-col gap-2 w-full">                               
                                                                                                    
                                    <div className="flex flex-row justify-between w-full">
                                        <div className="flex flex-row justify-center gap-3">
                                            
                                            <div className="shrink-0">
                                                <img src={book.coverImage ? book.coverImage : NoBookCoverImage} alt={book.title} 
                                                    className="w-22 h-33 md:w-25 md:h-31 object-cover rounded" />
                                            </div>
                                            
                                            <div className="min-w-0 flex-1">
                                                
                                                <div className="md:flex-1 space-y-1 md:space-y-3">
                                                
                                                    <Badge variant="outline"> {book.category?.name }</Badge> 
                                                    <h3 className="text-sm font-bold">{book.title}</h3>   
                                                    <p className="text-sm text-muted-foreground">{book.author.name}</p> 
                                                    <div className="flex items-center text-sm gap-1">

                                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                        <span className=" font-bold">{book?.rating} </span>
                                                    
                                                        {/* <span className="font-bold text-sm">({loan.book.reviewCount})</span> */}
                                                    
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="relative flex md:hidden flex-col items-center justify-center">
                                            <Button variant="ghost"
                                                    onClick={
                                                        (e) => {
                                                            e.stopPropagation();                                                            
                                                            setOpenBookId(isOpenBookId === book.id ? null : book.id)
                                                        }
                                                    }
                                            >
                                                <MoreHorizontal size={36} color="#000000" />
                                            </Button>
                                        </div>

                                        {
                                            isOpenBookId === book.id && (
                                                <div className="absolute right-22  w-40 h-30 bg-white shadow-md w-1/4">
                                                    <div className="flex flex-col gap-4">

                                                        <Button size="sm" variant="ghost"
                                                                onClick={
                                                                    () => {
                                                                        navigate(`/admin/books/preview/${book.id}`)
                                                                    }
                                                                }
                                                        >Preview</Button>
                                                        <Button size="sm" variant="ghost"
                                                                onClick={
                                                                    () => {
                                                                        navigate(`/admin/books/edit/${book.id}`)
                                                                    }
                                                                }
                                                        >Edit</Button>
                                                        <Button size="sm" variant="ghost"
                                                                onClick={
                                                                    () => {                                                                                                                               
                                                                        // deleteBook(book.id);
                                                                        setOpenBookId(null);
                                                                        setBookToDelete(book);                                                                        
                                                                    }
                                                                }
                                                        >Delete</Button>

                                                    </div>
                                                </div>

                                            )
                                        }

                                        <div className="hidden md:flex flex-col items-center justify-center">
                                                                                    
                                            {/* <p className="text-xs font-medium"> Borower's Name</p>                                        
                                            <p className="text-sm font-bold">{ book.borrower.name }</p>                                         */}
                                            
                                            {/* Tombol Preview, Edit, Delete */}
                                            <div className="flex flex-row gap-2">


                                                <Button size="sm" variant="outline"
                                                        onClick={
                                                            () => {
                                                                navigate(`/admin/books/preview/${book.id}`)
                                                            }
                                                        }>
                                                    Preview            
                                                </Button>

                                                <Button size="sm" variant="outline"
                                                        onClick={
                                                            () => {
                                                                
                                                                // setModalOpen(true);
                                                                // setSelectedBook(book);
                                                                navigate(`/admin/books/edit/${book.id}`)
                                                            }
                                                        }>
                                                    Edit            
                                                </Button>

                                                <Button size="sm" variant="destructive"
                                                        onClick={
                                                            () => { 
                                                                //deleteBook(book.id) 
                                                                setOpenBookId(null);
                                                                setBookToDelete(book);
                                                            }
                                                        }>
                                                    Delete        
                                                </Button>
                                                
                                            </div> 

                                        </div>
                                    </div>
                                </div>
                                 
                                
                            </div>
                        )
                    )
                }
            </div>
                 
            )
        }
 
        {
            bookToDelete && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                 onClick={() => setBookToDelete(null)}>
                
                <div className="bg-white rounded-xl shadow-lg p-6 px-4 mx-4 w-120 space-y-4"
                     onClick={(e) => e.stopPropagation()}>
                    
                    <h2 className="text-lg font-bold">Delete Data</h2>
                    
                    <p className="text-sm font-medium">
                        {/* Once deleted, you wont't be able to recover this data{' '}
                        Book: <span className="font-semibold text-foreground">"{bookToDelete.title}"</span>?
                         */}

                        Once deleted, you wont't be able to recover this data
                    </p>

                    <div className="flex justify-start gap-2 pt-2 w-full">
                        <Button variant="outline" onClick={() => setBookToDelete(null)}
                                className="w-1/2 md:w-50"
                            >
                            Cancel
                        </Button>
                        
                        <Button variant="destructive" onClick={handleConfirmDelete} 
                                className="bg-[#D9206E] text-white w-1/2 md:w-50">
                            Confirm
                        </Button>
                    
                    </div>
                
                </div>

            </div>
        )}


 
    </div>    
  )
}

export default BookListAdminPage