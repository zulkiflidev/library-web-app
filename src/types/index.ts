export interface Author {
    id: number;
    name: string;
    bio: string;
    createdAt: string;
    updatedAt: string;

}


export interface Category {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface ReviewUser {
    id: number;
    name: string;
}

export interface Review {
    id: number;
    star: number;
    // rating: number;
    comment: string;
    userId: number;
    bookId: number;
    createdAt: string;
    updatedAt: string;
    user: ReviewUser;
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
    category?: Category;
    reviews?: Review[];


}