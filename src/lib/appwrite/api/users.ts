import { appwriteConfig, databases } from "../config";

export function getUsers() {
    const users = databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
    )

    if (!users) throw Error;

    return users;
}
