import { createBrowserRouter } from "react-router-dom";
import LoginPage from '@/features/auth/LoginPage';
import RegisterPage from '@/features/auth/RegisterPage';
import HomePage from '@/features/books/HomePage'
import Layout from "@/components/common/layout";

import BookDetailPage from "@/features/books/BookDetailPage";
import BorrowedListPage from "@/features/loans/BorrowedListPage";

import UserListAdminPage from '@/features/admin/UserListAdminPage';
import BookListAdminPage from '@/features/admin/BookListAdminPage';
import BorrowedListAdminPage from '@/features/admin/BorrowedListAdminPage';
import ProtectedRoute from "@/components/common/ProtectedRoute";

import CategoryPage from "@/features/books/CategoryPage";
import ProfilePage from "@/features/profile/ProfilePage";

import AddEditBookPage from '../features/admin/AddEditBookPage'
import PreviewAdminPage from '../features/admin/PreviewAdminPage';

import BookByAuthorPage from "@/features/books/BookByAuthorPage";
import AuthLayout from "@/components/common/authLayout";

import ReviewsListPage from "@/features/reviews/ReviewsListPage";
import SearchPage from '@/features/books/SearchPage';
import CartPage from '@/features/cart/CartPage';


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
                    path: '/search',
                    element: <SearchPage />
                
                },

                {
                    path: '/cart',
                    element: <CartPage />
                
                },

                {
                    element: <ProtectedRoute allowedRoles={['USER', 'ADMIN']} />,
                    children: [

                        {
                            path: '/profile',
                            element: <ProfilePage />
                        },

                        {
                            path: '/loans',
                            element: <BorrowedListPage />
                        },
                       
                        {
                            path: '/reviews',
                            element: <ReviewsListPage />
                        },                        
                        
                    ]
                },

                {
                    element: <ProtectedRoute allowedRoles={['ADMIN']} />,
                    children: [
                        {
                            path: '/admin/users',
                            element: <UserListAdminPage />                
                        },
                        {
                            path: '/admin/books',
                            element: <BookListAdminPage />                
                        },
                        {
                            path: '/admin/loans',
                            element: <BorrowedListAdminPage />                
                        },
                        {   path: '/admin/books/add', 
                            element: <AddEditBookPage /> 
                        },
                        { 
                            path: '/admin/books/edit/:id', 
                            element: <AddEditBookPage /> 
                        },

                        { 
                            path: '/admin/books/preview/:id', 
                            element: <PreviewAdminPage /> 
                        },


                    ]
                }

            ]
        },
        {
            path: '/',
            element: <AuthLayout />,
            children: [
                {
                    path: '/login',
                    element: <LoginPage />
                },
                {
                    path: '/register',
                    element: <RegisterPage />
                }

            ]
        },


    ]
);











