import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
// APIS
import { getCurrentUser, getInfiniteUsers, getUsers } from "@/lib/appwrite/api/users"
import { QUERY_KEYS } from "@/lib/react-query/queryKeys"

export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getCurrentUser
    })
}

export const useGetUsers = (limit?: number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USERS],
        queryFn: () => getUsers(limit),
    })
}

export const useGetInfiniteUsers = () => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_INFINITE_USERS],
        queryFn: getInfiniteUsers,
        // @ts-expect-error: Due to the Appwrite API specification 
        getNextPageParam: (lastPage) => {
            if (lastPage && lastPage.documents.length === 0) return null;

            const lastId = (lastPage?.documents[lastPage.documents.length - 1].$id)?.toString();

            return lastId;
        }
    })
}
