import { UserOutputModel } from './usermodel.ts';

export interface CommentOutputModel {
    _id: string;
    content: string;
    author: UserOutputModel;
    post: string;
    timestamp: string;
    edit_timestamp?: string | null;
}

export interface CommentInputModel {
    postId: string;
    commentId: string;
    content: string;
}
