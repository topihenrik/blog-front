import { UserOutputModel } from './usermodel.ts';

export interface PostOutputModel {
    _id: string;
    title: string;
    content: string;
    description: string;
    author: UserOutputModel;
    timestamp: string;
    edit_timestamp?: string | null;
    photo: {
        is_default: boolean;
        public_id?: string | null;
        originalName: string;
        url: string;
    };
    published: boolean;
    count: number;
}

export interface PostInputModel {
    title: string;
    content: string;
    description: string;
    published: boolean;
    photo: File | null;
}
