//import React from 'react'

import { useState } from 'react';
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

import { Menu, X } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(false); //open menu mobile atau tidak?

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search.trim() ) {
      navigate('/search');
    }
  };

  return (
    <nav className="relative border-b px-6 py-3 flex items-center justify-between px-4 
                    md:px-20">
    
      <Button variant="ghost" onClick={() => navigate('/')}>

          <div className="flex items-center gap-2 cursor-pointer ">
            <img src={logo} alt="logo" className="w-8 h-8" />

            <span className="hidden md:flex font-bold text-lg">Booky</span>

          </div>      
      
      </Button>

      { token && user?.role === 'USER' && (
       
          <div className="relative w-full max-w-md">
              <Input placeholder="Search any book" value={search} 
                     onChange={ (e) => dispatch( setSearch(e.target.value) )}
                     onKeyDown={handleSearchKeyDown}
              className="pl-8 pr-3 w-full"
              />
              <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
          </div>

      )}


      { token  ? (                
        <>
          <div className="hidden md:flex">
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

                          <span className="hidden md:flex text-sm font-medium">{user?.name}</span>
                          <ChevronDown className="hidden md:flex w-4 h-4 text-muted-foreground" />

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
          </div>     

          <Button variant="ghost" className="flex md:hidden"
                  onClick={ () => setIsOpen(!isOpen) }
          >                                    
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
          </Button>

{/* //====menu for mobile for logged user         */}
          {isOpen && token && (
            <div className="absolute top-full left-0 w-full bg-white border-t shadow-md flex flex-col md:hidden z-50">

              <button className="text-left px-4 py-3 hover:bg-gray-50 text-sm border-b"
                      onClick={() => { navigate('/profile'); setIsOpen(false); }}>
                Profile
              </button>

              <button className="text-left px-4 py-3 hover:bg-gray-50 text-sm border-b"
                      onClick={() => { navigate('/loans'); setIsOpen(false); }}>
                Borrowed List
              </button>

              <button className="text-left px-4 py-3 hover:bg-gray-50 text-sm border-b"
                      onClick={() => { navigate('/reviews'); setIsOpen(false); }}>
                Reviews
              </button>

              {user?.role === 'ADMIN' && (
                <>
                  <button className="text-left px-4 py-3 hover:bg-gray-50 text-sm border-b"
                          onClick={() => { navigate('/admin/users'); setIsOpen(false); }}>
                    Admin - Users
                  </button>

                  <button className="text-left px-4 py-3 hover:bg-gray-50 text-sm border-b"
                          onClick={() => { navigate('/admin/books'); setIsOpen(false); }}>
                    Admin - Books
                  </button>

                  <button className="text-left px-4 py-3 hover:bg-gray-50 text-sm border-b"
                          onClick={() => { navigate('/admin/loans'); setIsOpen(false); }}>
                    Admin - Borrowed List
                  </button>
                </>
              )}

              <button className="text-left px-4 py-3 hover:bg-red-50 text-sm text-red-500"
                      onClick={() => { dispatch(logout()); navigate('/login'); setIsOpen(false); }}>
                Logout
              </button>

            </div>
          )}
{/* //=====end menu for mobile */}

        </>  
      ):(

      <>  
        <div className="flex items-center gap-2">

            <Button className="hidden md:flex" 
                    variant="outline" 
                    onClick={() => navigate('/login')}>
              Login
            </Button>

            <Button className="bg-[#1C65DA] hidden md:flex" 
                    onClick={() => navigate('/register')}>
              Register
            </Button>

            {/* menu berikut Hanya muncul dimobile */}
            { 
              isOpen ? (
                <Button className="md:hidden" variant="ghost" onClick={ () => setIsOpen(!isOpen) }>
                  <X size={36} />
                </Button>
              ):(
                <Button className="md:hidden" variant="ghost" onClick={ () => setIsOpen(!isOpen) }>
                  <Menu size={36} />
                </Button>
              )
            }
          
        </div>   
        
        {
          isOpen && (
            <div className="absolute bg-white top-10 flex gap-2 pb-10
                  mt-4 w-full items-center justify-center md:hidden">

                <button className="px-4 py-2.5 
                        items-center justify-center
                        flex text-center border border-gray-300 
                        text-gray-700 font-medium rounded-lg 
                        hover:bg-gray-50 active:bg-gray-100"
                        onClick={ () => navigate("/login") }
                        >
                  Login
                </button>

                <button className=" px-4 py-2.5 flex text-center bg-blue-600 text-white 
                      font-medium rounded-lg shadow-sm active:bg-blue-700"
                      onClick={ () => navigate("/register") }
                      >
                  Register
                </button>

            </div>
          )
        }  
      </>      
      )}
    
    </nav>    
  )
}

export default Navbar