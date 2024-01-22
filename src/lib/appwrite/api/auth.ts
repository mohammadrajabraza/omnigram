import { ID, Models } from "appwrite";
// APPWRITE CONFIG
import { account, avatars } from "@/lib/appwrite/config";
// APIS
import { saveUserToDB } from "@/lib/appwrite/api/users";
// TYPES
import { INewUser } from "@/types";

// Signup user and store to database
export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        )

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        })

        return newUser;
    } catch (error) {
        console.log(error)
        return error;
    } 
}

// Sign in user
export async function signInAccount(user: {
    email: string; password: string;
}) {
    try {
        const session = account.createEmailSession(user.email, user.password);
        return session;
    } catch (error) {
        console.log(error)
    }
}

// Sign out user
export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        console.log(error)
    }
}

export async function requestVerification(): Promise<Models.Token> {
    try {
        const result = await account.createVerification(`${import.meta.env.VITE_APP_BASE_URL}/verification`)

        return result;
    } catch (error) {
        console.log(error)
        throw error;
    } 
}
