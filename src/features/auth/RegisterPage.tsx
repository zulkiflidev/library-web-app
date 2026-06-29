// import React from 'react'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useRegister from '@/hooks/useRegister';

import logo from '@/assets/logo.svg';
import { z } from 'zod';

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] =  useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { mutate: register, isPending, isError } = useRegister()

  const registerSchema = z.object({
      
      name: z.string().min(1, 'Nama wajib diisi'),
      email: z.string().email('Format email tidak valid'),
      phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
      password: z.string().min(6, 'Password minimal 6 karakter'),
      confirmPassword: z.string()
  
  }).refine((data) => data.password === data.confirmPassword, {
  
      message: "Password dan Confirm Password tidak cocok",
      path: ["confirmPassword"],
    
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    
    setErrors({}); 
    const result = registerSchema.safeParse({      
      name,
      email,
      phone,
      password,
      confirmPassword,

    });

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
             
      result.error.issues.forEach((issue) => {
        if (issue.path[0] !== undefined ) {
          const fieldName = String(issue.path[0]);
          formattedErrors[ fieldName ] = issue.message;
        }
      });

      setErrors(formattedErrors);  
      return; 
    }
    
    register({ name, email, phone, password });
  };  
  
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
            <Input type="text" placeholder="" value={name}
               onChange={ (e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-destructive text-[11px] mt-1">{errors.name}</p>}       

        </label>

        <label className="text-xs font-medium text-slate-700">
            Email
            <Input type="email" placeholder="" value={email}
               onChange={ (e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-destructive text-[11px] mt-1">{errors.email}</p>}       

        </label>
        
        <label className="text-xs font-medium text-slate-700">                
            Phone Number
            <Input type="text" placeholder="" 
                  value={phone}
                  onChange={ (e) => setPhone(e.target.value)}
            />
            {errors.phone && <p className="text-destructive text-[11px] mt-1">{errors.phone}</p>}       

        </label>

        <label className="text-xs font-medium text-slate-700">
            Password
            <Input type="password" placeholder="" 
                  value={password}
                  onChange={ (e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-destructive text-[11px] mt-1">{errors.password}</p>}       

        </label>

        <label className="text-xs font-medium text-slate-700">
            Confirm Password
            <Input type="password" placeholder="" 
                  value={confirmPassword}
                  onChange={ (e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <p className="text-destructive text-[11px] mt-1">{errors.confirmPassword}</p>}       

        </label>


        { isError && (
          <p className="text-sm text-destructive">Register failed, please try again</p>
        )}

        <Button className="w-full bg-[#1C65DA] mt-5" disabled={isPending}
                // onClick={ () => 
                //   register(
                //     {
                //         name, email, phone, password
                //     }
                //   )
                // }
                onClick={handleSubmit}

                >

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