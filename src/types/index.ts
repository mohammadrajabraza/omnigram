export interface INewUser {
    name: string;
    email: string;
    username: string;
    password: string;
}

export interface INewPost {
    userId: string;
    caption: string;
    file: File[];
    location?: string;
    tags?: string;
}

export interface IUpdatePost {
    postId: string;
    caption: string;
    imageId: string;
    imageUrl: URL;
    file: File[];
    location?: string;
    tags?: string;
}

export interface IContextType {
    user: IUser;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () =>  Promise<boolean>;
}

export interface IUser {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
}

export interface IUpdateUser {
    id: string;
    name: string;
    username: string;
    email: string;
    bio: string;
    file?: Array<File>;
    imageId: string;
    imageUrl: URL;
}

export interface INavLink {
    imgURL: string;
    route: string;
    label: string;
    isProtected: boolean;
}
