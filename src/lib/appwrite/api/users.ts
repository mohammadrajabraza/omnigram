import { ID, Query } from "appwrite";
// APPWRITE CONFIG
import { account, appwriteConfig, databases } from "@/lib/appwrite/config";

export function getUsers(limit?: number) {
    const queries: Array<string> = [Query.orderDesc('$updatedAt')];
    
    // If limit is available add it to the query
    if (limit) {
        queries.push(Query.limit(limit))
    }

    const users = databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        queries,
    )

    if (!users) throw Error;

    return users;
}

// Get users in infinite scroll fashion
export async function getInfiniteUsers({ pageParam }: { pageParam: number }) {
    const queries: Array<string> = [Query.orderDesc('$updatedAt'), Query.limit(10)]
    
    // If pageParam is available add it to the query
    if (pageParam) {
        queries.push(Query.cursorAfter(pageParam.toString()))
    }
    
    try {
        const users = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            queries
        )

        if (!users) throw Error;

        return users;
    } catch (error) {
        console.log(Error);
    }
}

// Find a user by ID
export async function getUserById(userId: string) {
    try {
        const user = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            userId
        )

        if (!user) throw Error;

        return user
    } catch (error) {
        console.log(error)
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
}

export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
}) {
    try {
        const newUser = databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )

        return newUser
    } catch (error) {
        console.log(error);
    }
}
