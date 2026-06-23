import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import type { RootState } from '../store';
import api from '../lib/axios';


const useBooks = () => {

    const search = useSelector( (state: RootState) => state.ui.search );
    const category = useSelector( (state: RootState) => state.ui.category );

    return useQuery({
        queryKey: ['books', search, category],
        queryFn: async() =>{
            const response = await api.get('/books', {
                params: { search, category },
            })
            return response.data.data.books;
        }

    });

}

export default useBooks
