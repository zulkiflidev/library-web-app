//import React from 'react'

import { useState } from 'react';
import useLoans from '@/hooks/useLoans';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import ReviewModal from '@/components/common/ReviewModal';





function BorrowedListPage() {

  const [status, setStatus] = useState('all');
  const { data, isLoading, isError } = useLoans( status );

  const [selectedBookId, setSelectedBookId] = useState<number | null>(null)

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: Failed to load loans list...</div>

  return (
    <div  className="space-y-6">
    
        <h1 className="text-2xl font-bold">My Loans</h1>
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


        {data?.loans.length === 0 && (
            <p className="text-muted-foreground text-sm">No loans found.</p>
        )}

        <div className="space-y-4">
            {
                data?.loans.map( (loan) => (
                    <div key={loan.id} className="border rounded-lg p-4 flex">
                        <img src={loan.book.coverImage} alt={loan.book.title} className="w-16 h-20 object-cover rounded" />
                        <div className="flex-1 space-y-1">
                            
                            <h3 className="text-sm font-medium">{loan.book.title}</h3>
                            
                            <p className="text-sm text-muted-foreground">{loan.book.author.name}</p>
                            
                            <Badge variant={
                                loan.status === 'BORROWED' ? 'default' : 
                                loan.status === 'OVERDUE' ? 'destructive' : 'outline'
                            } >

                                { loan.displayStatus }

                            </Badge>

                            <p className="text-xs text-muted-foreground">
                                Borrowed: {
                                    new Date(loan.borrowedAt).toLocaleDateString('id-ID')
                                }
                            </p>

                            <p className="text-xs text-muted-foreground">
                                Due Date: { new Date(loan.dueAt).toLocaleDateString('id-ID') 
                                }
                            </p>


                        </div>

                        { loan.status === 'BORROWED' && (
                            <Button size="sm" variant="outline"
                                    onClick={ () => setSelectedBookId(loan.book.id) }
                            >
                                Give Review
                            </Button>
                        )}



                    </div>
                ))


            }
        </div>

        <ReviewModal open={selectedBookId !== null}
                 onClose={ () => setSelectedBookId(null) }
                 bookId={selectedBookId ?? 0}
    
        />

    </div>    

  )
}

export default BorrowedListPage