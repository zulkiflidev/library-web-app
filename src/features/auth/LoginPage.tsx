// import React from 'react'

import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useMutation } from '@tanstack/react-query';
// import { setCredentials } from './authSlice';
//import type { AppDispatch } from '@/store';

import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import api from '@/lib/axios';

import useLogin from '@/hooks/useLogin'
 
import logo from '@/assets/logo.svg';


function LoginPage() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: login, isPending, isError } = useLogin();

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4 px-4 md:px-20">

        <div className="flex items-center gap-2 cursor-pointer ">
            <img src={logo} alt="logo" className="w-8 h-8" />

            <span className="font-bold text-lg">Booky</span>

        </div> 

        <h1 className="text-2xl font-bold text-left">
          Login
        </h1>
        
        <p className="text-sm text-left">Sign in to manage your library account.</p>

        <label className="text-xs font-medium text-slate-700">
          Email
          <Input type="email" placeholder="Email" value={email}
               onChange={ (e) => setEmail(e.target.value)}
        />
        </label>
        
        <label className="text-xs font-medium text-slate-700">
          Password
          <Input type="password" placeholder="Password" 
                value={password} onChange={ (e) => setPassword(e.target.value)}        
          />
          {
            isError && (
              <p className="text-sm text-destructive">Wrong Email or Password!</p>
            )
          }  
        </label>        
        
        
        <Button className="w-full bg-[#1C65DA] mt-5" disabled={isPending} 
                onClick={ () => login({email, password})}
        >

          {isPending ? 'Loading...' : 'Login'}

        </Button>

        <p className="text-sm text-left">
          Don't have an account? {' '}
          <span className="text-[#1C65DA] cursor-pointer hover:underline "
          onClick={ () => navigate('/register')}>
            Register
          </span>
        </p>


    </div>
  )
}

export default LoginPage