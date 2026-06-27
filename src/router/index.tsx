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
import ProfilePage from "@/features/profile/ProfilePage";

import AddEditBookPage from '../features/admin/AddEditBookPage'
import BookByAuthorPage from "@/features/books/BookByAuthorPage";

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
                    path: '/author/:id',
                    element: <BookByAuthorPage />
                },

                {
                    element: <ProtectedRoute allowedRoles={['USER', 'ADMIN']} />,
                    children: [

                        {
                            path: '/loans',
                            element: <BorrowedListPage />
                        },
                        {
                            path: '/profile',
                            element: <ProfilePage />
                        }
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
                        {   path: '/admin/books/add', 
                            element: <AddEditBookPage /> 
                        },
                        { 
                            path: '/admin/books/edit/:id', 
                            element: <AddEditBookPage /> 
                        },



                    ]
                }

            ]
        },
    ]
);











