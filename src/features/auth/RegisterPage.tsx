// import React from 'react'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useRegister from '@/hooks/useRegister';

import logo from '@/assets/logo.svg';

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] =  useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('')

  const { mutate: register, isPending, isError } = useRegister()


  return (
    <div className="max-w-md mx-auto mt-10 space-y-4 px-4 md:px-20">

        <div className="flex items-center gap-2 cursor-pointer ">
            <img src={logo} alt="logo" className="w-8 h-8" />
            <span className="font-bold text-lg">Booky</span>
        </div>

        <h1 className="text-2xl font-bold text-left">Register</h1>

        <p className="text-xs">Create your account to start borrowing books.</p>

        <label className="text-xs font-medium text-slate-700">
            Name          
            <Input type="text" placeholder="Name" value={name}
               onChange={ (e) => setName(e.target.value)}
            />

        </label>

        <label className="text-xs font-medium text-slate-700">
            Email
            <Input type="email" placeholder="Email" value={email}
               onChange={ (e) => setEmail(e.target.value)}
            />            

        </label>
        
        <label className="text-xs font-medium text-slate-700">                
            Phone Number
            <Input type="text" placeholder="Phone Number" 
                  value={phone}
                  onChange={ (e) => setPhone(e.target.value)}
            />
        </label>

        <label className="text-xs font-medium text-slate-700">
            Password
            <Input type="password" placeholder="Password" 
                  value={password}
                  onChange={ (e) => setPassword(e.target.value)}
            />
        </label>

        { isError && (
          <p className="text-sm text-destructive">Register failed, please try again</p>
        )}

        <Button className="w-full bg-[#1C65DA] mt-5" disabled={isPending}
                onClick={ () => register({
                  name, email, phone, password
                })}>

          {isPending ? 'Loading...' : 'Register'}

        </Button>

        <p className="text-sm text-center text-muted-foreground">
           Already have account? {' '}
           <span className="text-[#1C65DA] font-bold cursor-pointer hover:underline"
                onClick={ () => navigate('/login')}>
                  Login
           </span>
        </p>



    </div>
  )
}

export default RegisterPage