import { createBrowserRouter } from "react-router-dom";
import LoginPage from '@/features/auth/LoginPage';
import RegisterPage from '@/features/auth/RegisterPage';
import HomePage from '@/features/books/HomePage'
import Layout from "@/components/common/layout";

import BookDetailPage from "@/features/books/BookDetailPage";
import BorrowedListPage from "@/features/loans/BorrowedListPage";

import UserListPage from '@/features/admin/UserListPage';
import BookListAdminPage from '@/features/admin/BookListAdminPage';
import BorrowsListPage from '@/features/admin/BorrowsListPage';


export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Layout />,
            children: [
                
                {
                    path: '/',
                    element: <HomePage />

                },
                {
                    path: '/login',
                    element: <LoginPage />

                },
                {
                    path: '/register',
                    element: <RegisterPage />  
                },
                {
                    path: '/books/:id',
                    element: <BookDetailPage />
                },
                {
                    path: '/loans',
                    element: <BorrowedListPage />
                },
                
                {
                    path: '/admin/users',
                    element: <UserListPage />                
                },
                {
                    path: '/admin/books',
                    element: <BookListAdminPage />                
                },
                {
                    path: '/admin/loans',
                    element: <BorrowsListPage />                
                },
                


            ]
        },
    ]
);











