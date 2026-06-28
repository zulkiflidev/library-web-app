import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import type { RootState } from '../store';
import api from '../lib/axios';


const useBooks = (overrideCategoryId?: number | null, limit?:number) => {

    const search = useSelector( (state: RootState) => state.ui.search );
    const category = useSelector( (state: RootState) => state.ui.category );
    const categoryIdFromRedux = useSelector( (state: RootState) => state.ui.categoryId );

    const categoryId = overrideCategoryId !== undefined ? overrideCategoryId : categoryIdFromRedux;

    return useQuery({
        queryKey: ['books', search, category, categoryId],
        queryFn: async() =>{
            const response = await api.get('/books', {
                params: 
                { 
                  q: search, 
                  category: category ?? undefined,
                  categoryId: categoryId ?? undefined,
                  limit: limit ?? undefined
                },
            
            })

            return response.data.data.books;
        }

    });

}


// const useBooks = () => {

//     const search = useSelector( (state: RootState) => state.ui.search );
//     const category = useSelector( (state: RootState) => state.ui.category );
//     const categoryId = useSelector( (state: RootState) => state.ui.categoryId );

//     return useQuery({
//         queryKey: ['books', search, category, categoryId],
//         queryFn: async() =>{
//             const response = await api.get('/books', {
//                 params: 
//                 { 
//                   q: search, 
//                   category: category ?? undefined,
//                   categoryId: categoryId ?? undefined,
//                 },
//             })
//             return response.data.data.books;
//         }

//     });

// }

export default useBooks
