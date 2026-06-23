import type { Book } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

//nnati dulu, mungkin entar dipake
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';

import { Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom';



interface BookCardProps {
    book: Book;
}

function BookCard({ book }: BookCardProps) {
    const navigate =  useNavigate();

    return (
        <Card className = "flex flex-col overflow-hidden transition-shadow hover:shadow-lg "
        onClick={() => navigate(`/books/${book.id}`)}
        >
            
            <img src={book.coverImage} alt={book.title} className="w-full h-48 object-cover" />
            
            <CardContent className="flex-1 p-4 space-y-2">
                <h3 className="text-lg font-semibold line-clamp-2">{book.title}</h3>
                <p className="text-xs text-muted-foreground">{book.author.name}</p>

                <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{book.rating}</span>
                </div>


                {/* --//Nanti dulu, mungkin diperlukan...
                <Badge variant={book.availableCopies > 0 ? 'default' : 'destructive'}>
                    {book.availableCopies > 0 ? 'In Stock' : 'Out of Stock'}
                </Badge> */}
                
                 

            </CardContent>
            <CardFooter>

            </CardFooter>

        </Card>
    );
};

export default BookCard;