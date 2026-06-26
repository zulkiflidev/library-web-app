//import React from 'react'

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'

import type { RootState, AppDispatch } from "@/store"
import { Button } from '@/components/ui/button'
import { setSearch } from '@/features/books/uiSlice';

import logo from '@/assets/logo.svg';


function Navbar() {

  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);


  const dispatch = useDispatch<AppDispatch>();
  const search = useSelector( (state: RootState) => state.ui.search   );

  return (
    <nav className="border-b px-6 py-3 flex items-center justify-between">
    
      <div className="flex items-center gap-2 cursor-pointer">
        <img src={logo} alt="logo" className="w-8 h-8" />

        <span className="font-bold text-lg">Booky</span>

      </div>

      {/* Untuk pencarian Buku */}
      { token && (

        <input type="text" placeholder="Search"
         className="border rounded-md px-3 py-1.5 text-sm w-72 bg-background" 
         value={search}
         onChange={ (e) => dispatch( setSearch(e.target.value)  )  }
         
         />

      
      )}


      { token ? (
        <div className="flex items-center gap-3">
          <span className="text-sm"> Nama User</span>
        </div>
      ):(

        <div className="flex items0center gap-2">

          <Button variant="outline" onClick={() => navigate('/login')}>
            Login
          </Button>

          <Button onClick={() => navigate('/register')}>
            Register
          </Button>

        </div>

      )}
    
    </nav>
  )
}

export default Navbar