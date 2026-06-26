//import React from 'react'

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '@/store';


interface ProtectedRouteProps {
    allowedRoles?: ('USER' | 'ADMIN')[]
}


function ProtectedRoute({ allowedRoles} : ProtectedRouteProps) 
{

    const { token, user } = useSelector((state: RootState) => state.auth);

//   console.log('user role:', user?.role)
//   console.log('allowedRoles:', allowedRoles)
//   console.log('includes:', allowedRoles && user && !allowedRoles.includes(user.role))
//console.log('full user object:', user)

console.log('user role:', user?.role)
console.log('allowedRoles:', allowedRoles)

    if (!token) return <Navigate to="/login" replace />

    if (allowedRoles && user  && !allowedRoles.includes(user.role))
    {
        return <Navigate to="/" replace />
    }

    return <Outlet />
   
}

export default ProtectedRoute