import { useMutation, useQueryClient } from "@tanstack/react-query";
// APPWRITE CONFIG
import { createUserAccount, signInAccount, signOutAccount } from "@/lib/appwrite/api/auth";
// TYPES
import { INewUser } from "@/types";
import { QUERY_KEYS } from "../queryKeys";

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

export const useSignInAccount = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (user: {
            email: string;
            password: string;
        }) => signInAccount(user),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            })
        }
    })
}

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
}
