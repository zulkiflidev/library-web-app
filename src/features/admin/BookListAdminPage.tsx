import { useState } from 'react';
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


function BookListAdminPage() {

  const [status, setStatus] = useState('all');
  const { data, isLoading, isError } = useBooks( status );

  const navigate = useNavigate();

  const { mutate: deleteBook } = useDeleteBook();


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: Failed to load loans list...</div>

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
        <div className="flex gap-2">
            {
                ['all', 'active', 'returned', 'overdue'].map(
                    (s) => (
                        <Button key={s} variant={status === s ? 'default' : 'outline'} size="sm" 
                        onClick={ () => setStatus(s) }
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

        <div className="space-y-4">
            {
                data?.books.map(
                    (book) => (

                        <div key={book.id} className="border rounded-lg p-4 flex w-full">
                           
                            <div className="flex flex-col gap-2 w-full">                               
                                
                                {/* 
                                <div className="flex flex-row justify-between w-full">
                                    <div>
                                        <p className="font-bold">
                                            Status: <Badge variant="secondary">{loan.displayStatus}</Badge>
                                        </p>
                                    </div>
                                    <div className="flex flex-row gap-5 items-center">
                                        <p className="font-bold">Due Date:</p>

                                        <Badge variant="secondary">
                                            
                                                                                           
                                            {
                                                new Date(loan.dueAt).toLocaleDateString('id-ID',{
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })
                                                .replace(/\s*pukul\s * /i, ', ')
                                            }                                                
                                        </Badge>
                                    
                                    </div>
                                </div> 
                                */}
                                
                                <hr className="w-full border-t border-gray-300 my-1" />

                                <div className="flex flex-row justify-between w-full">
                                    <div className="flex flex-row justify-center gap-2">
                                        <div>
                                            <img src={book.coverImage} alt={book.title} 
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

    </div>    

  )
}

export default BookListAdminPage