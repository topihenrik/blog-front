import { ShortUserResponse } from './shortuserresponse.ts';
import { GuidResponse } from './guidresponse.ts';

export interface CommentResponse {
    id: string;
    content: string;
    author: ShortUserResponse;
    post: GuidResponse;
    createdAt: string;
    updatedAt: string | null;
}

export interface CreateCommentRequest {
    postId: string;
    content: string;
}

export interface UpdateCommentRequest {
    commentId: string;
    content: string;
}
