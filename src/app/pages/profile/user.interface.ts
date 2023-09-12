export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePhoto: string;
    coverPhoto: string;
    role: string;
    followerCount: number;
    followingCount: number;
    enabled: boolean;
    accountVerified: boolean;
    emailVerified: boolean;
    joinDate: string;
    dateLastModified: string;
    phone:string;
    about:string;
    points:number;
}