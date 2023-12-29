import { ID, Query } from "appwrite";
// APPWRITE CONFIG
import { appwriteConfig, databases } from "@/lib/appwrite/config";
// APIS
import { deleteFile, getFilePreview, uploadFile } from "@/lib/appwrite/api/files";
// TYPES
import { INewPost, IUpdatePost } from "@/types";

// Get recent posts
export function getRecentPosts() {
    const posts = databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.orderDesc('$createdAt'), Query.limit(20)]
    )

    if (!posts) throw Error;

    return posts;
}

// Get infinite posts
export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
    const queries: Array<string> = [Query.orderDesc('$updatedAt'), Query.limit(10)]
    
    // If pageParam is available add it to the query
    if (pageParam) {
        queries.push(Query.cursorAfter(pageParam.toString()))
    }
    
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            queries
        )

        if (!posts) throw Error;

        return posts;
    } catch (error) {
        console.log(Error);
    }
}

// Find a user by ID
export async function getPostById(postId: string) {
    try {
        const post = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
        )

        if (!post) throw Error;
        return post
    } catch (error) {
        console.log(error)
    }
}

// Create new post
export async function createPost(post: INewPost) {
    try {
        // Upload file to appwrite storage
        const uploadedFile = await uploadFile(post.file[0]);

        if (!uploadedFile) throw Error;

        // Get file url
        const fileUrl = getFilePreview(uploadedFile.$id);
        if (!fileUrl) {
            await deleteFile(uploadedFile.$id);
            throw Error;
        }

        // Convert tags into array
        const tags = post.tags?.replace(/ /g, "").split(",") || [];

        const newPost = databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags,
            },
        )

        if (!newPost) {
            await deleteFile(uploadedFile.$id);
            throw Error;
        }

        return newPost;
    } catch (error) {
        console.log(error)
        return error;
    } 
}

// Update existing post
export async function updatePost(post: IUpdatePost) {
    const hasFileToUpload = post.file.length > 0;

    try {
        let image = {
            imageUrl: post.imageUrl,
            imageId: post.imageId,
        }

        if (hasFileToUpload) {
            // Upload file to appwrite storage
            const uploadedFile = await uploadFile(post.file[0]);
    
            if (!uploadedFile) throw Error;

            // Get file url
            const fileUrl = getFilePreview(uploadedFile.$id);
            
            if (!fileUrl) {
                await deleteFile(uploadedFile.$id);
                throw Error;
            }

            image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id }
        }

        // Convert tags into array
        const tags = post.tags?.replace(/ /g, "").split(",") || [];

        const updatedPost = databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            post.postId,
            {
                caption: post.caption,
                imageUrl: image.imageUrl,
                imageId: image.imageId,
                location: post.location,
                tags: tags,
            },
        )

        if (!updatePost) {
            await deleteFile(image.imageId);
            throw Error;
        }

        return updatedPost;
    } catch (error) {
        console.log(error)
        return error;
    } 
}

// Delete post
export async function deletePost(postId: string, imageId: string) {
    try {
        const result = await deleteFile(imageId);

        if (result?.status !== 'ok') throw Error;

        const postDeleteResult: { message?: string } = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
        )

        if (postDeleteResult?.message !== '') throw postDeleteResult.message;

        return { status: 'ok'};
    } catch (error) {
        console.log(error)
        return error;
    } 
}

// Search post by caption
export async function searchPosts(searchTerm: string) {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [Query.search('caption', searchTerm)]
        )

        if (!posts) throw Error;

        return posts;
    } catch (error) {
        console.log(Error);
    }
}

// Like a post
export async function likePost(postId: string, likesArray: Array<string>) {
    try {
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId,
            {
                likes: likesArray,
            }
        )

        if (!updatedPost) throw Error;

        return updatedPost;

    } catch (error) {
        console.log(error)
    }
}

// Mark a post as saved
export async function savePost(postId: string, userId: string) {
    try {
        const savedPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            ID.unique(),
            {
                user: userId,
                post: postId,
            }
        )

        if (!savedPost) throw Error;

        return savedPost;

    } catch (error) {
        console.log(error)
    }
}

// Unmark a saved post
export async function deleteSavedPost(savedRecordId: string) {
    try {
        const statusCode = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            savedRecordId
        )

        if (!statusCode) throw Error;

        return { status: 'ok' };

    } catch (error) {
        console.log(error)
    }
}
