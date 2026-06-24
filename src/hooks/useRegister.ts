import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';


const useRegister = () => {

    const navigate = useNavigate();


    return useMutation (
        {
            mutationFn: async (data: {
                name: string;
                email: string;
                phone: string;
                password: string;
            }) =>{
                const response = await api.post('/auth/register', data);
                return response.data;
            },
            onSuccess: () => {
                navigate('/login');
            }
        
        }
    );

}

export default useRegister;