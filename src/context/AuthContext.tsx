import { createContext, useContext, useEffect, useState } from 'react'
// APIS
import { getCurrentUser } from '@/lib/appwrite/api/users';
// QUERIES & MUTATIONS
import { useGetCurrentUser } from '@/lib/react-query/queriesAndMutations/users';
// TYPES
import { IContextType, IUser } from '@/types';

export const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: ''
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children } : { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { data: currentUser , status, isFetching, isLoading, isRefetching } = useGetCurrentUser();

    useEffect(() => {
        if (status === "success" && currentUser) {
            // Update the user state with the currentUser from the hook
            setUser({
                id: currentUser.$id,
                name: currentUser.name,
                username: currentUser.username,
                email: currentUser.email,
                imageUrl: currentUser.imageUrl,
                bio: currentUser.bio,
            });
            // Set the isAuthenticated state to true
            setIsAuthenticated(true);
        } else {
            // Reset the user state to the initial value
            setUser(INITIAL_USER);
            // Set the isAuthenticated state to false
            setIsAuthenticated(false);
        }
    }, [currentUser, status]);

    const checkAuthUser = async () => {
        try {
            const currentAccount = await getCurrentUser(); 

            if (currentAccount) {
                return true;
            }

            // If no authenticated user 
            return false;
        } catch (error) {
            console.log(error)
            return false;
        }
    };

    const value = {
        user,
        setUser,
        isLoading: status === 'pending' || isLoading || isFetching || isRefetching,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext)
