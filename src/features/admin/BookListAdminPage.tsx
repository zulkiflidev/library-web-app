import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// import ReviewModal from '@/components/common/ReviewModal';
// import useLoans from '@/hooks/useLoans';
import useBooks from '@/hooks/admin/useAdminBooks';
import Breadcrumb from '@/components/common/Breadcrumb';

import ProfileTabs from '@/components/common/ProfileTabs'
import { Star } from 'lucide-react';

//import useNavigate from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDeleteBook } from '@/hooks/admin/useAdminBooksMutation';
import { Input } from '@/components/ui/input';

import NoBookCoverImage from '@/assets/noBookCoverImage.webp';

function BookListAdminPage() {

   const navigate = useNavigate();
   const { mutate: deleteBook } = useDeleteBook();

   const[q, setQ] = useState('');   
   const [debounceQ, setDebounceQ] = useState(''); 
   const [status, setStatus] = useState('all');

   useEffect(() => {
        
        const timer = setTimeout(
            () =>{
                setDebounceQ(q);
            }, 500
        );       
        return () => clearTimeout(timer);

   }, [q] )

//    const input 

   const { data, isLoading, isError } = useBooks( debounceQ, status );


  return (
    <div  className="space-y-6 px-4 md:px-20">
    
        <Breadcrumb items={
            [
                { label: 'Home', href: '/' },
                { label: 'Book List' },
            ]
        } 
        />
        
        <ProfileTabs variant="admin" />

        <h1 className="text-2xl font-bold">Book List</h1>

        <div className="flex flex-col gap-2 w-1/2">
            <Button variant="default" className="w-1/3 bg-[#1C65DA]" onClick={ () => navigate('/admin/books/add') }>
                Add Book
            </Button>

            <Input placeholder="Search Books..." value={q} onChange={ (e) => setQ(e.target.value)}
                className="max-w-sm"
            />
        </div>

        <div className="flex gap-2">
            {
                ['all', 'available', 'borrowed', 'returned'].map(
                    (s) => (
                        <Button key={s} variant={status === s ? 'default' : 'outline'} size="sm" 
                        onClick={ 
                            () => setStatus(s) 
                            //() => setDebounceQ(s)
                        }
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
                                                                                                        
                                        {/* <hr className="w-full border-t border-gray-300 my-1" /> */}

                                        <div className="flex flex-row justify-between w-full">
                                            <div className="flex flex-row justify-center gap-2">
                                                <div>
                                                    <img src={book.coverImage ? book.coverImage : NoBookCoverImage} alt={book.title} 
                                                        className="w-25 h-31 object-cover rounded" />
                                                </div>
                                                <div>
                                                    {/* info detail buku */}
                                                    <div className="flex-1 space-y-3">
                                                    
                                                        <Badge variant="outline"> {book.category?.name }</Badge> 

                                                        <h3 className="text-md font-bold">{book.title}</h3>                                                                                           
                                                        <p className="text-xs text-muted-foreground">{book.author.name}</p> 

                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                            <span className=" font-bold">{book?.rating} </span>
                                                        
                                                            {/* <span className="font-bold text-sm">({loan.book.reviewCount})</span> */}
                                                        
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="flex flex-col items-center justify-center">
                                                
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
                                                                () => { deleteBook(book.id)}
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


    </div>    
  )
}

export default BookListAdminPage