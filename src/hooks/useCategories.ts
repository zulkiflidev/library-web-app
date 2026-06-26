import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';

import type { CategoryResponse } from '@/types';

const useCategories = () => {

    return useQuery(
        {
            queryKey: ['categories'],
            queryFn: async() =>{
                const response = await api.get('/categories');
                return response.data.data as CategoryResponse;

            }
        }        
    );            
}


export default useCategories;