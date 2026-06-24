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


function LoginPage() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: login, isPending, isError } = useLogin();

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
        <h1 className="text-2xl font-bold text-center"></h1>
        
        <Input type="email" placeholder="Email" value={email}
               onChange={ (e) => setEmail(e.target.value)}
        />
        <Input type="password" placeholder="Password" 
              value={password} onChange={ (e) => setPassword(e.target.value)}        
        />
        {
          isError && (
            <p className="text-sm text-destructive">Wrong Email or Password!</p>
          )
        }

        <Button className="w-full" disabled={isPending} 
                onClick={ () => login({email, password})}
        >

          {isPending ? 'Loading...' : 'Login'}

        </Button>

        <p className="text-sm text-center text-muted-foreground">
          Not yet have an account? {' '}
          <span className="text-primary cursor-pointer hover:underline"
          onClick={ () => navigate('/register')}>
            Register
          </span>
        </p>


    </div>
  )
}

export default LoginPage