//import React from 'react'

import { Outlet } from 'react-router-dom';

import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';



function Layout() {
  return (
    <div className="min-h-screen bg-background">
        
        <Navbar />
        <main className="container mx-auto px-4 py-6">
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default Layout