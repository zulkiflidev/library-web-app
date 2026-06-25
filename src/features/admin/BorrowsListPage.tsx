//import React from 'react'

import { useState } from 'react';

import useAdminLoans from '@/hooks/admin/useAdminLoans';

import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';


function BorrowsListPage() {

  const [q, setQ] =  useState('');
  const { data, isLoading, isError } = useAdminLoans(q);

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to Load Borrows Data</div>


  return (
    <div className="space-y-6">

        <h1 className="text-2xl font-bold"> Borrows List </h1>        

        <Input placeholder="Find Book title or user name..." 
               value={q} 
               onChange={ (e) => setQ(e.target.value)}
               className="max-w-sm"         
        />

        <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-muted">
                    <tr>
                        <th className="text-left -p-3">Book</th>
                        <th className="text-left -p-3">User</th>
                        <th className="text-left -p-3">Status</th>
                        <th className="text-left -p-3">Date</th>
                        <th className="text-left -p-3">Due Date</th>
                    </tr>
                </thead>

                <tbody>

                    { data?.loans.map( (loan) => (
                        <tr key={loan.id} className="border-t">
                            
                            <td className="p-3 font-medium">
                                {loan.book.title}
                            </td>
                            
                            <td className="p-3 font-medium">
                                {loan.borrower.name}
                                <div className="text-xs text-muted-foreground">
                                    {loan.borrower.email}
                                </div>                            
                            </td>

                            <td className="p-3">

                                <Badge variant={
                                    loan.status === 'BORROWED' ? 'default' : 
                                    loan.status === 'OVERDUE' ? 'destructive' : 'outline'
                                }>
                                    {loan.displayStatus}
                                </Badge>
                        
                            </td>

                            <td className="p-3">
                                {new Date(loan.borrowedAt).toLocaleDateString('id-ID')}
                            </td>

                            <td className="p-3">
                                {new Date(loan.dueAt).toLocaleDateString('id-ID')}
                            </td>

                        </tr>
                    )) }
                </tbody>
            </table>

        </div>

    </div>
  )
}

export default BorrowsListPage