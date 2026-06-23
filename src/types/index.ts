export interface Author {
    id: number;
    name: string;
    bio: string;

}

export interface Book{
    id: number;
    title: string;
    description: string;
    isbn: string;
    publishedYear: number;
    coverImage: string;
    rating: number;
    reviewCount: number;
    totalCopies: number;
    availableCopies: number;
    borrowCount: number;
    authorId: number;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
    author: Author;

}