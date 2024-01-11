import * as z from "zod";

export const UserProfileUpdate = z.object({
    name: z
        .string()
        .min(3, {message: "The name must be 3 characters or more!"})
        .max(50, {message: "The name must be 50 characters or less!"})
        .regex(
            /^[a-zA-Z ]+$/,
            "Name can only contain letters and spaces!"
        ),
    username: z
        .string()
        .min(2, {message: "The username must be 2 characters or more!"})
        .max(30, {message: "The username must be 30 characters or less!"})
        .regex(
            /^[a-zA-Z0-9_-]+$/,
            "The username can only only letters, numbers, hyphen (-) and underscore (_)"
        ),
    email: z.string().email(),
    bio: z.string(),
    file: z.custom<Array<File>>().optional(),
})
