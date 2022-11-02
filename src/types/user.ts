import { User } from "firebase/auth";

export interface IUser extends User {
    role: 'user' | 'admin'
}