import { useQuery } from '@tanstack/react-query';
import api from '../../lib/axios';
import type { AdminUsersResponse } from '../../types';

const useAdminUsers = (q: string = '') => {

    return useQuery(
        {
            queryKey: ['adminUsers', q],
            queryFn: async () =>{
                const response = await api.get('/admin/users', {
                    params: { q , page: 1, limit: 10 },
                });
                return response.data.data as AdminUsersResponse;
            }
        }
    );
}

export default useAdminUsers;