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

//===Untuk Filter by Category

export interface Category {

    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface CategoryResponse {

    categories: Category[];

}


//===Untuk Profile

export interface LoanStats {
    borrowed: number;
    late: number;
    returned: number;
    total: number;
}


export interface UserProfile {
    id: number;
    name: string;
    email: string;
    phone: string;
    profilePhoto: string | null;
    role: 'USER' | 'ADMIN';
    createdAt: string;

}

export interface ProfileResponse {
    profile: UserProfile;
    loanStats: LoanStats;
    reviewsCount: number;
}






//===Pinjam Buku

export interface Loan {
    id: number;
    status: 'BORROWED' | 'RETURNED' | 'OVERDUE';
    displayStatus: string;
    borrowedAt: string;
    dueAt: string;
    returnedAt: string | null;
    durationDays: number;
    book: Book;
}

export interface LoanPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface LoanResponse {
    loans: Loan[];
    pagination: LoanPagination;

}


//===Review

export interface MyReview {
    id: number;
    star: number;
    comment: string;
    createdAt: string;
    book: Book;
}

export interface MyReviewResponse {
    reviews: MyReview[];
    pagination: LoanPagination;
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


//===Admin

export interface AdminUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    profilePhoto: string | null;
    role: 'USER' | 'ADMIN';
    createdAt: string;
}

export interface AdminUsersResponse {
    users: AdminUser[];
    pagination: LoanPagination;
}

export interface AdminBooksResponse {
    books: Book[];
    pagination: LoanPagination;
}

export interface Borrower {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export interface AdminLoan {
    id: number;
    status: 'BORROWED' | 'RETURNED' | 'OVERDUE';
    displayStatus: string;
    borrowedAt: string;
    dueAt: string;
    returnedAt: string | null;
    durationDays: number;
    borrower: Borrower;
    book: Pick<Book, 'id' | 'title' | 'coverImage' | 'author' | 'category'>;

}

export interface AdminLoansResponse {
    loans: AdminLoan[];
    pagination: LoanPagination;

}





