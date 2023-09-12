import { User } from "../pages/profile/user.interface";

export class Joiners {
    username:string;
    name:string;
    email: string;
    phone:string;
    date: Date;
    country:string;
    roles: any;
    profilePicture:string;
    coverPicture:string;
}

export class UserOrganization {
    id: number;
    organizationName: string;
}

export class UserResponse {
    user: User;
    followedByAuthUser: boolean;
}

export class Organization {
    name: string;
    email: string;
    phone: string;
    joiners: number;
}

export class Leaderboard {
    firstName:string;
    lastName:string;
    points:number;
    pointsMonth:number;
    pointsYear:number;
    profilePhoto:string;
}