import { useState } from 'react';
import useAdminUsers from '@/hooks/admin/useAdminUsers';

import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';


function UserListPage(){

    const[q, setQ] = useState('');
    const { data, isLoading, isError } = useAdminUsers(q);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Failed to Load Users Data</div>;

    return(
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">User List</h1>

            <Input placeholder="Find name, email, phone..." value={q} onChange={ (e) => setQ(e.target.value)}
            className="max-w-sm"
            />

            <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-muted">

                        <tr>
                            <th className="text-left -p-3">Name</th>
                            <th className="text-left -p-3">Email</th>
                            <th className="text-left -p-3">Phone</th>
                            <th className="text-left -p-3">Role</th>
                            <th className="text-left -p-3">Joined</th>

                        </tr>
                    </thead>

                    <tbody>

                        {
                            data?.users.map( (user) => (
                                <tr key={user.id} className="border-t">
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">{user.phone}</td>
                                    <td className="p-3">
                                        <Badge variant={
                                            user.role === 'ADMIN' ? 'default' : 'outline'
                                        }>
                                            
                                            {user.role}   

                                        </Badge>

                                    </td>
                                    <td className="p-3">
                                        {new Date(user.createdAt).toLocaleDateString('id-ID')}
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

export default UserListPage;