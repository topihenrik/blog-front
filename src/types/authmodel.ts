import { ShortUserResponse } from './shortuserresponse.ts';

export interface SignUpRequest {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    password: string;
    avatar?: File;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: ShortUserResponse;
}
