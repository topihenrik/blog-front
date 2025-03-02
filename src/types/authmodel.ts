import { User } from './user.ts';

export interface SignupInputModel {
    avatar?: File;
    first_name: string;
    last_name: string;
    email: string;
    dob: string;
    password: string;
    password_confirm: string;
}

export interface LoginInputModel {
    email: string;
    password: string;
}

export interface LoginOutputModel {
    token: string;
    user: User;
}
