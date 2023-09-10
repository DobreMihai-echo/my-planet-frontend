import { User } from "../pages/profile/user.interface";

export class Joiners {
    name:string;
    email: string;
    phone:string;
    date: Date;
    country:string;
    role: string;
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