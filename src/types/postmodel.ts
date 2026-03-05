import { ShortUserResponse } from './shortuserresponse.ts';
import { ImageResponse } from './imagemodel.ts';

export interface PostResponse {
    id: string;
    title: string;
    content: string;
    // description: string;
    author: ShortUserResponse;
    createdAt: string;
    updatedAt: string | null;
    image: ImageResponse | null;
    isPublished: boolean;
    commentCount: number | null;
}

export interface CreatePostRequest {
    title: string;
    content: string;
    isPublished: boolean;
    image: File | null;
}

export interface UpdatePostRequest {
    title: string;
    content: string;
    description: string;
    published: boolean;
    image: File | null;
}
