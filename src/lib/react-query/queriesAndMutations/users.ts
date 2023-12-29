import { useQuery } from "@tanstack/react-query"
// APIS
import { getCurrentUser, getUsers } from "@/lib/appwrite/api/users"
import { QUERY_KEYS } from "@/lib/react-query/queryKeys"

export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getCurrentUser
    })
}

export const useGetUsers = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USERS],
        queryFn: getUsers,
    })
}
