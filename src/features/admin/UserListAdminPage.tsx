import { useState, useEffect } from 'react';
import useAdminUsers from '@/hooks/admin/useAdminUsers';

import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Modal } from '@/components/ui/modal';
// import { Badge } from '@/components/ui/badge';
// import Breadcrumb from '@/components/common/Breadcrumb';
import ProfileTabs from '@/components/common/ProfileTabs';
import { Search } from 'lucide-react';

function UserListAdminPage(){

    const[q, setQ] = useState('');
    const [debounceQ, setDebounceQ] = useState('');

    // if (isLoading) return <div>Loading...</div>;
    // if (isError) return <div>Failed to Load Users Data</div>;

    useEffect(() => {
        
        const timer = setTimeout(
            () =>{
                setDebounceQ(q);
            }, 500
        );       
        return () => clearTimeout(timer);

    }, [q] )

    const { data, isLoading, isError } = useAdminUsers(debounceQ);


    return(
        <div className="space-y-6  px-4 md:px-20">

            {/* <Breadcrumb items={
                [
                    { label: 'Home', href: '/' },
                    { label: 'User List (Admin)' },
                ]
            } 
            /> */}

            <ProfileTabs variant="admin" />

            <h1 className="text-2xl font-bold">User</h1>
            
            <div className="relative">
                <Input placeholder="Search Users..." value={q} onChange={ (e) => setQ(e.target.value)}
                className="max-w-md pl-8 pr-5"
                />
                <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
            </div>

            <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-muted">

                        <tr className="text-left p-5">
                            <th className="text-left p-3">No</th>
                            <th className="text-left p-3">Name</th>
                            <th className="text-left p-3">Phone</th>
                            <th className="text-left p-3">Email</th>                      
                            <th className="text-left p-3">Created at</th>

                        </tr>
                    </thead>

                    <tbody>

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
                                                                
                                data?.users.map( (user, index) => (
                                    <tr key={user.id} className="border-t">
                                        <td className="p-3">{index+1}</td>
                                        <td className="p-3">{user.name}</td>
                                        <td className="p-3">{user.phone}</td>
                                        <td className="p-3">{user.email}</td>                                   
                                        <td className="p-3">
                                            {/* {new Date(user.createdAt).toLocaleDateString('id-ID')} */}
                                            {
                                                new Date(user.createdAt).toLocaleDateString('id-ID',{
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })
                                                .replace(/\s*pukul\s*/i, ', ')
                                            }  
                                        </td>


                                    </tr>
                                ) )
                                                            
                                
                            )
                        }
                    </tbody>

                </table>

            </div>



        </div>
    );

}

export default UserListAdminPage;