import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// import ReviewModal from '@/components/common/ReviewModal';
// import useLoans from '@/hooks/useLoans';
import useLoans from '@/hooks/admin/useAdminLoans';
// import Breadcrumb from '@/components/common/Breadcrumb';
import ProfileTabs from '@/components/common/ProfileTabs'

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

import NoBookCoverImage from '@/assets/noBookCoverImage.webp';


function BorrowedListAdminPage() {

//   const [status, setStatus] = useState('all');
//   const { data, isLoading, isError } = useLoans( status );
//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error: Failed to load loans list...</div>


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

  const { data, isLoading, isError } = useLoans( debounceQ, status );

  
  return (
    <div  className="space-y-6 px-4 md:px-20">
    
        {/* <Breadcrumb items={
            [
                { label: 'Home', href: '/' },
                { label: 'Borrowed List' },
            ]
        } 
        /> */}
        
        <ProfileTabs variant="admin" />

        <h1 className="text-2xl font-bold">Borrowed List</h1>

        <div className="relative w-full max-w-md">
            <Input placeholder="Search book..." value={q} onChange={ (e) =>  setQ(e.target.value) }
            className="pl-8 pr-3 w-full"
            />
            <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
        </div>


        <div className="flex gap-2">
            {
                ['all', 'active', 'returned', 'overdue'].map(
                    (s) => (
                        <Button key={s} variant={status === s ? 'default' : 'outline'} size="sm" 
                        onClick={ () => {
                            setStatus(s);
                            setQ('');
                        } }
                        >
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </Button>                    
                    )
                )            
            }

        </div>

        {data?.loans.length === 0 && (
            <p className="text-muted-foreground text-sm">No loans found.</p>
        )}

        <div className="space-y-4">
            {
                isLoading ? (
                    <div>Loading...</div>

                ) : isError ? (
                    <div>Error: Failed to load loans list...</div>
                ): (
                   
                    data?.loans.map(
                        (loan) => (

                            <div key={loan.id} className="border rounded-lg p-4 flex w-full">
                            
                                <div className="flex flex-col gap-2 w-full">                               
                                    <div className="flex flex-row justify-between w-full">
                                        <div>
                                            <p className="font-bold">
                                                Status: <Badge variant="secondary">{loan.displayStatus}</Badge>
                                            </p>
                                        </div>
                                        <div className="flex flex-row gap-5 items-center">
                                            <p className="font-bold">Due Date:</p>

                                            <Badge variant="secondary">
                                                
                                                {/* {new Date(loan.dueAt).toLocaleDateString('id-ID')} */}                                                 
                                                {
                                                    new Date(loan.dueAt).toLocaleDateString('id-ID',{
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })
                                                    .replace(/\s*pukul\s*/i, ', ')
                                                }                                                
                                            </Badge>
                                        
                                        </div>
                                    </div>
                                    
                                    <hr className="w-full border-t border-gray-300 my-1" />

                                    <div className="flex flex-row justify-between w-full">
                                        <div className="flex flex-row justify-center gap-2">
                                            <div>
                                                 
                                                {/* <p>{loan.book.coverImage}</p>  */}                                               
                                                <img src={loan.book.coverImage ? loan.book.coverImage : NoBookCoverImage} alt={loan.book.title} 
                                                    className="w-25 h-31 object-cover rounded" />
                                            </div>
                                            <div>
                                                {/* info detail buku */}
                                                <div className="flex-1 space-y-3">
                                                
                                                    <Badge variant="outline"> {loan.book.category?.name }</Badge> 

                                                    <h3 className="text-md font-bold">{loan.book.title}</h3>                                                                                           
                                                    <p className="text-xs text-muted-foreground">{loan.book.author.name}</p> 

                                                    <div className="flex flex-row gap-2">
                                                        <p className="text-xs font-bold">
                                                            {
                                                                new Date(loan.borrowedAt).toLocaleDateString('id-ID',{
                                                                    day: 'numeric',
                                                                    month: 'long',
                                                                    year: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                }).replace(/\s*pukul\s*/i, ', ')
                                                            }
                                                        </p>

                                                        
                                                        <p className="text-xs font-bold">
                                                            -   Durations {
                                                                loan.durationDays
                                                            }
                                                        </p>
                                                    </div>
                                                    {/* <p className="text-xs text-muted-foreground">
                                                        Due Date: { new Date(loan.dueAt).toLocaleDateString('id-ID') 
                                                        }
                                                    </p> */}
                                                </div>

                                            </div>

                                        </div>

                                        <div className="flex flex-col items-center justify-center">
                                            
                                            <p className="text-xs font-medium"> Borower's Name</p>                                        
                                            <p className="text-sm font-bold">{ loan.borrower.name }</p>                                        
                                            
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        )
                    )                                                      
                )

            }
        </div>

    </div>    

  )
}

export default BorrowedListAdminPage