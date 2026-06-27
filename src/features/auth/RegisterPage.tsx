// import React from 'react'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useRegister from '@/hooks/useRegister';

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] =  useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('')

  const { mutate: register, isPending, isError } = useRegister()


  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4 px-4 md:px-20">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        
        <Input type="text" placeholder="Name" value={name}
               onChange={ (e) => setName(e.target.value)}
        />

        <Input type="email" placeholder="Email" value={email}
               onChange={ (e) => setEmail(e.target.value)}
        />
                
        <Input type="text" placeholder="Phone Number" 
               value={phone}
               onChange={ (e) => setPhone(e.target.value)}
        />     

        <Input type="password" placeholder="Password" 
               value={password}
               onChange={ (e) => setPassword(e.target.value)}
        />     

        { isError && (
          <p className="text-sm text-destructive">Register failed, please try again</p>
        )}

        <Button className="w-full" disabled={isPending}
                onClick={ () => register({
                  name, email, phone, password
                })}>

          {isPending ? 'Loading...' : 'Register'}

        </Button>

        <p className="text-sm text-center text-muted-foreground">
           Already have account? {' '}
           <span className="text-primary cursor-pointer hover:underline"
                onClick={ () => navigate('/login')}>
                  Login
           </span>
        </p>



    </div>
  )
}

export default RegisterPage