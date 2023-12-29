import { ID } from "appwrite";
// APPWRITE CONFIG
import { appwriteConfig, storage } from "@/lib/appwrite/config";

// Upload file to storage
export async function uploadFile(file: File) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        );
  
        return uploadedFile;
    } catch (error) {
        console.log(error);
    }
}

// Get file preview URL
export function getFilePreview(fileId: string) {
    try {
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            "top",
            100
        );
  
        if (!fileUrl) throw Error;
  
        return fileUrl;
    } catch (error) {
        console.log(error);
    }
}

// Delete file 
export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(appwriteConfig.storageId, fileId);
    
        return { status: "ok" };
    } catch (error) {
        console.log(error);
    }
}
