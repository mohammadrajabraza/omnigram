import { useMutation } from "@tanstack/react-query";
// APPWRITE CONFIG
import { createUserAccount, signInAccount, signOutAccount } from "@/lib/appwrite/api/auth";
// TYPES
import { INewUser } from "@/types";

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email: string;
            password: string;
        }) => signInAccount(user)
    })
}

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
}
