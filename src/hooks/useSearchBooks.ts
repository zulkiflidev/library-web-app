import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { Book } from '@/types';

interface SearchParams {
  q: string;
  categoryId?: number | null;
}

async function fetchSearchBooks({ q, categoryId }: SearchParams): Promise<Book[]> {
  const params: Record<string, string | number> = { q };
  if (categoryId) params.categoryId = categoryId;

  const response = await axiosInstance.get('/books', { params });
  return response.data.data.books; 
}

const useSearchBooks = (
  { q, categoryId }: SearchParams) => {
  return useQuery(
        {
            queryKey: ['books', 'search', q, categoryId],
            queryFn: () => fetchSearchBooks(
              { 
                  q, 
                  categoryId 

              }),
            enabled: q.trim().length > 0, 
        }
    );
}

export default useSearchBooks;