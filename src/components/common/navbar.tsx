//import React from 'react'

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'

import type { RootState, AppDispatch } from "@/store"
//import { Button } from '@/components/ui/button'
import { setSearch } from '@/features/books/uiSlice';

import logo from '@/assets/logo.svg';
import bagIcon from '@/assets/BagIcon.svg';
import defaultPhoto from '@/assets/DefaultPhoto.png';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

//import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { logout } from '@/features/auth/authSlice';

import { ChevronDown } from 'lucide-react'
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';


import {
  DropdownMenu, 
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';


function Navbar() {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  
  const search = useSelector( (state: RootState) => state.ui.search   );

  return (
    <nav className="border-b px-6 py-3 flex items-center justify-between px-4 md:px-20">
    
      <Button variant="ghost" onClick={() => navigate('/')}>

          <div className="flex items-center gap-2 cursor-pointer ">
            <img src={logo} alt="logo" className="w-8 h-8" />

            <span className="font-bold text-lg">Booky</span>

          </div>      
      
      </Button>

      { token && user?.role === 'USER' && (
       
          <div className="relative w-full max-w-md">
              <Input placeholder="Search book..." value={search} onChange={ (e) => dispatch( setSearch(e.target.value) )}
              className="pl-8 pr-3 w-full"
              />
              <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
          </div>

      )}


      { token ? (
                
        // <div className="flex items-center gap-3">
        //   <span className="text-sm"> Nama User</span>
        // </div>
        <DropdownMenu>
          
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" 
                        className="flex items-center gap-3 outline-none"
                >
                    {/* 👤 {user?.name} */}

                      <div className="relative">
                        <img src={bagIcon} alt="bag icon" className="w-6 h-6" />
                      </div>

                      <Avatar className="w-9 h-9">
                          <AvatarImage src={user?.profilePhoto ?? undefined} />
                          <AvatarFallback>
                              <img src={defaultPhoto} 
                                  alt="default photo" 
                                  className="w-full h-full rounded-full object-cover" />
                          </AvatarFallback>
                      </Avatar>

                      <span className="text-sm font-medium">{user?.name}</span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />

                </Button>

            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={ () => navigate('/profile')}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={ () => navigate('/loans')}>
                Borrowed List
              </DropdownMenuItem>

              <DropdownMenuItem onClick={ () => navigate('/reviews')}>
                Reviews
              </DropdownMenuItem>

              {
                user?.role === 'ADMIN' && (
                  <div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={ () => navigate('/admin/users')}>
                        Admin - Users
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={ () => navigate('/admin/books')}>
                        Admin - Books
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={ () => navigate('/admin/loans')}>
                        Admin - Borrowed List  
                      </DropdownMenuItem>

                  </div>
                )
              }
              
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive"
                                onClick={ 
                                    () => {
                                      dispatch( logout() );
                                      navigate('/login');
                                    }
                                }>

                Logout

              </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>

      ):(

        <div className="flex items0center gap-2">

          <Button variant="outline" onClick={() => navigate('/login')}>
            Login
          </Button>

          <Button className="bg-[#1C65DA]" onClick={() => navigate('/register')}>
            Register
          </Button>

        </div>

      )}
    
    </nav>
  )
}

export default Navbar