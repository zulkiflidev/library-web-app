import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCredentials } from '@/features/auth/authSlice';
import type { AppDispatch } from '@/store'

import api from '@/lib/axios';

const useLogin = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    return useMutation(
        {
            mutationFn: async(data:{
                email: string;
                password: string;
            }) =>{
                const response = await api.post(
                    '/auth/login',
                    data
                );
                return response.data;
            },
            onSuccess: (data) => {
                dispatch( setCredentials({
                    token: data.data.token,
                    user: data.data.user,
                }));
                navigate('/');
            }
        }
    )
}

export default useLogin;