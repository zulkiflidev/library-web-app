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
import ProtectedRoute from "@/components/common/ProtectedRoute";

import CategoryPage from "@/features/books/CategoryPage";

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
                    path: '/category',
                    element: <CategoryPage />
                },

                {
                    element: <ProtectedRoute allowedRoles={['USER', 'ADMIN']} />,
                    children: [

                        {
                            path: '/loans',
                            element: <BorrowedListPage />
                        },
                    ]
                },

                {
                    element: <ProtectedRoute allowedRoles={['ADMIN']} />,
                    children: [
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
                }

            ]
        },
    ]
);











