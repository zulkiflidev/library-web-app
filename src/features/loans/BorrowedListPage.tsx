//import React from 'react'

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import ReviewModal from '@/components/common/ReviewModal';

import useLoans from '@/hooks/useLoans';
import useReturnBook from '@/hooks/useReturnBook';
import useMyReviews from '@/hooks/useMyReviews';
import useReviewBook from '@/hooks/useReviewBook';
// import useDeleteReview from '@/hooks/useDeleteReview';

import type { MyReview } from '@/types';
// import Breadcrumb from '@/components/common/Breadcrumb';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ProfileTabs from '@/components/common/ProfileTabs'
  
import NoBookCoverImage from '@/assets/noBookCoverImage.webp';


function BorrowedListPage() {

//   const [status, setStatus] = useState('all');
//   const { data, isLoading, isError } = useLoans( status );

  const [selectedBookId, setSelectedBookId] = useState<number | null>(null)
  const { mutate: returnBook, isPending: isReturning } = useReturnBook();

  
  //==Untuk daftar review yg sudah diberikan...  
  const { data: myReviews } = useMyReviews();
  const getMyReview = (bookId: number): MyReview | undefined =>  {
     return myReviews?.reviews.find( (r) => r.book.id === bookId);
  }

  //==Untuk hapus review
  const { deleteReviewMutation } = useReviewBook(0);
  const deleteReview = (reviewId: number) => { 
    deleteReviewMutation.mutate(reviewId);

  }

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
        
        <ProfileTabs />

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
                            setStatus(s)
                            setQ('')
                        }}
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

        {
            isLoading ? (
                <div>Loading...</div>             
            ) : isError ? (
                <div>Error: Failed to load loans list...</div>
            ) : (
                 
                <div className="space-y-4">
                    {
                        data?.loans.map(
                            (loan) => (

                                <div key={loan.id} className="border rounded-lg p-4 flex w-full">
                                
                                    <div className="flex flex-col gap-2 w-full">                               
                                        <div className="flex flex-row justify-between w-full">
                                            <div>
                                                <p className="font-bold text-xs">
                                                    Status: <Badge variant="secondary">{loan.displayStatus}</Badge>
                                                </p>
                                            </div>
                                            <div className="flex flex-row gap-5 items-center">
                                                <p className="font-bold text-xs">Due Date:</p>

                                                <Badge variant="secondary">
                                                    
                                                    {/* {new Date(loan.dueAt).toLocaleDateString('id-ID')} */}                                                 
                                                    {
                                                        new Date(loan.dueAt).toLocaleDateString('id-ID',{
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                            // hour: '2-digit',
                                                            // minute: '2-digit'
                                                        })
                                                        .replace(/\s*pukul\s*/i, ', ')
                                                    }                                                
                                                </Badge>
                                            
                                            </div>
                                        </div>
                                        
                                        <hr className="w-full border-t border-gray-300 my-1" />

                                        <div className="flex flex-col md:flex-row justify-between w-full">
                                            <div className="flex flex-row justify-center gap-2">
                                                <div className="w-full md:w-auto">
                                                    <img src={loan.book.coverImage ? loan.book.coverImage : NoBookCoverImage} 
                                                         alt={loan.book.title} 
                                                        className="w-25 h-31 object-cover rounded" />
                                                </div>
                                                <div>
                                                    {/* info detail buku */}
                                                    <div className="flex-1 space-y-2">
                                                    
                                                        <Badge variant="outline"> {loan.book.category?.name }</Badge> 

                                                        <h3 className="text-md font-bold">{loan.book.title}</h3>                                                                                           
                                                        <p className="text-xs text-muted-foreground">{loan.book.author.name}</p> 

                                                        {/* <Badge variant={
                                                            loan.status === 'BORROWED' ? 'default' : 
                                                            loan.status === 'OVERDUE' ? 'destructive' : 'outline'
                                                        } >

                                                            { loan.displayStatus }

                                                        </Badge> */}

                                                        <div className="flex flex-row gap-2">
                                                            <p className="text-xs font-bold whitespace-nowrap">
                                                                {
                                                                    new Date(loan.borrowedAt).toLocaleDateString('id-ID',{
                                                                        day: 'numeric',
                                                                        month: 'long',
                                                                        year: 'numeric',
                                                                        // hour: '2-digit',
                                                                        // minute: '2-digit'
                                                                    }).replace(/\s*pukul\s*/i, ', ')
                                                                }
                                                            </p>

                                                            
                                                            <p className="text-xs font-bold whitespace-nowrap">
                                                                -   Durations {
                                                                    loan.durationDays
                                                                } Days
                                                            </p>
                                                        </div>
                                                        {/* <p className="text-xs text-muted-foreground">
                                                            Due Date: { new Date(loan.dueAt).toLocaleDateString('id-ID') 
                                                            }
                                                        </p> */}
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="flex flex-col items-center justify-center w-full md:w-auto">
                                                {/* Terkait Return, Give Review */}
                                                { 
                                                    (loan.status === 'BORROWED' || loan.status === 'OVERDUE') && 
                                                        (
                                                            <div className="flex flex-col gap-2 w-full pt-2 md:w-auto" >

                                                                <Button size="sm" variant="destructive"
                                                                disabled={isReturning}
                                                                onClick={ () => returnBook(loan.id)}
                                                                >
                                                                    {isReturning ? 'Returning...' : 'Return Book'}
                                                                </Button>
                                                            </div>
                                                        )                        
                                                }
                                                
                                                {
                                                    loan.status === 'RETURNED' && (
                                                        <div className="flex flex-col gap-2 w-full pt-2 md:w-auto">
                                                            { 
                                                                getMyReview(loan.book.id) ? 
                                                                (
                                                                    <div className="flex flex-col md:flex-row gap-5 w-full pt-2 md:w-auto">
                                                                        <div className="flex flex-row items-center gap-2">
                                                                            <p className="text-xs text-muted-foreground">
                                                                                {/* ★ { getMyReview(loan.book.id)?.star }    */}
                                                                            </p>
                                                                            <p className="text-xs text-muted-foreground">
                                                                                {/* { getMyReview(loan.book.id)?.comment } */}
                                                                            </p>
                                                                        </div>

                                                                        <Button size="sm" 
                                                                            className="rounded-xl"
                                                                            variant="outline" 
                                                                            onClick={
                                                                            () => setSelectedBookId(loan.book.id)
                                                                        }>                                                                    
                                                                            Edit Review
                                                                        </Button>
                                                                        
                                                                        <Button size="sm" variant="destructive" 
                                                                            className="rounded-xl"
                                                                            onClick={
                                                                            () => {
                                                                                const review = getMyReview(loan.book.id);
                                                                                if (review) deleteReview(review.id);
                                                                            }
                                                                        }>
                                                                            Delete Review                                                                    
                                                                        </Button>
                                                                            
                                                                    </div>
                                                                ) 
                                                                : 
                                                                (
                                                                    <Button size="sm"  
                                                                            className="rounded-xl bg-[#1C65DA] mt-2"                                                                    
                                                                            onClick={ () => setSelectedBookId(loan.book.id) }
                                                                             
                                                                    >
                                                                        Give Review
                                                                    </Button>
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                }
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

        <ReviewModal open={selectedBookId !== null}
                 onClose={ () => setSelectedBookId(null) }
                 bookId={selectedBookId ?? 0}
    
        />

    </div>    

  )
}

export default BorrowedListPage