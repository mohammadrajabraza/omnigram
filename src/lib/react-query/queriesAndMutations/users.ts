import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// APIS
import { getCurrentUser, getInfiniteUsers, getUserById, getUsers, updateUserProfile } from "@/lib/appwrite/api/users"
import { QUERY_KEYS } from "@/lib/react-query/queryKeys"
import { IUpdateUser } from "@/types"
import { Models } from "appwrite"

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

export const useGetUserById = (userId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID],
        queryFn: () => getUserById(userId),
        enabled: !!userId
    })
}

export const useUpdateUserProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (user: IUpdateUser) => updateUserProfile(user),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.GET_CURRENT_USER,
                    QUERY_KEYS.GET_USER_BY_ID,
                    (data as Models.Document)?.$id
                ]
            })
        }
    })
}
