import { useState } from 'react';
import useAdminUsers from '@/hooks/admin/useAdminUsers';

import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Modal } from '@/components/ui/modal';
// import { Badge } from '@/components/ui/badge';
import Breadcrumb from '@/components/common/Breadcrumb';

import ProfileTabs from '@/components/common/ProfileTabs';

function UserListAdminPage(){

    const[q, setQ] = useState('');
    const { data, isLoading, isError } = useAdminUsers(q);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Failed to Load Users Data</div>;

    return(
        <div className="space-y-6  px-4 md:px-20">

            <Breadcrumb items={
                [
                    { label: 'Home', href: '/' },
                    { label: 'User List (Admin)' },
                ]
            } 
            />

            <ProfileTabs variant="admin" />

            <h1 className="text-2xl font-bold">User List</h1>

            <Input placeholder="Find name, email, phone..." value={q} onChange={ (e) => setQ(e.target.value)}
            className="max-w-sm"
            />

            <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-muted">

                        <tr>
                            <th className="text-left -p-3">No</th>
                            <th className="text-left -p-3">Name</th>
                            <th className="text-left -p-3">Phone</th>
                            <th className="text-left -p-3">Email</th>                      
                            <th className="text-left -p-3">Created at</th>

                        </tr>
                    </thead>

                    <tbody>

                        {
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
                        }

                    </tbody>

                </table>

            </div>



        </div>
    );

}

export default UserListAdminPage;