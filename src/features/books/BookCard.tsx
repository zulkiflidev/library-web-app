import type { Book } from '@/types';
import { 
    Card, 
    CardContent, 
    // CardFooter 
} from '@/components/ui/card';

//nnati dulu, mungkin entar dipake
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';

import { Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

import NoBookCoverImage from '@/assets/noBookCoverImage.webp';


interface BookCardProps {
    book: Book;
}

function BookCard({ book }: BookCardProps) {
    const navigate = useNavigate();

    return (
        <Card 
            className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg cursor-pointer"
            onClick={() => navigate(`/books/${book.id}`)}
        >
            
            <div className="relative w-full aspect-[3/4] overflow-hidden">
                <img 
                    src={book.coverImage ? book.coverImage : NoBookCoverImage} 
                    alt={book.title} 
                    
                    className="absolute inset-0 w-full h-full object-cover object-[center_20%]" 
                />
            </div>
             
            <CardContent className="flex-1 px-3 pt-2 pb-2 space-y-0.5">
                {/* `leading-tight` menjaga jarak antar baris judul tetap rapat jika teksnya panjang */}
                <h3 className="text-sm font-semibold line-clamp-2 leading-tight">{book.title}</h3>
                <p className="text-xs text-muted-foreground">{book.author.name}</p>

                {/* Bagian Rating */}
                <div className="flex items-center gap-1 pt-0.5">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{book.rating}</span>
                </div>

                {/* --//Nanti dulu, mungkin diperlukan...
                
                <Badge variant={book.availableCopies > 0 ? 'default' : 'destructive'}>
                    {book.availableCopies > 0 ? 'In Stock' : 'Out of Stock'}
                </Badge> 
                
                */}


            </CardContent>
            {/* <CardFooter>

            </CardFooter> */}

        </Card>
    );
};

export default BookCard;