import { useUserContext } from '@/context/AuthContext';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const RequireAuth = () => {
    const location = useLocation();
    const { user } = useUserContext();
    console.log({user})
    return (
        user.id ? (
            <Outlet />
        ) : (
            <Navigate to="/sign-in" state={{ from: location }} replace/>
        )
    )
}

export default RequireAuth
