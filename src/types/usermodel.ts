import { ImageResponse } from './imagemodel.ts';

export interface UserResponse {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    avatar: ImageResponse;
    createdAt: string;
    postCount: number;
    commentCount: number;
}

export interface UpdateUserBasicRequest {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    avatar: File | null;
}

export interface UpdateUserPasswordRequest {
    oldPassword: string;
    password: string;
}

export interface DeleteUserRequest {
    email: string;
    password: string;
}
