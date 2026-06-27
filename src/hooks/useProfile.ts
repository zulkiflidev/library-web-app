import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { ProfileResponse } from '@/types';



const useProfile = () =>{

    return useQuery(
        {
            queryKey: ['profile'],
            queryFn: async () => {
                const response = await api.get('/me');
                return response.data.data as ProfileResponse;
            }
        }
    );


}

export default useProfile;