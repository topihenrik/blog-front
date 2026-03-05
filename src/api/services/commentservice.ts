import { authRequest, request } from './network.ts';
import { CommentResponse, CreateCommentRequest, UpdateCommentRequest } from '../../types/commentmodel.ts';

export async function getCommentsByPostId(postId: string): Promise<CommentResponse[]> {
    return request({
        method: 'GET',
        url: `/posts/${postId}/comments`,
    });
}

export async function postComment(values: Omit<CreateCommentRequest, 'commentId'>): Promise<CommentResponse[]> {
    return authRequest({
        method: 'POST',
        url: `/comments`,
        data: {
            postId: values.postId,
            content: values.content,
        },
    });
}

export async function putComment(values: UpdateCommentRequest): Promise<CommentResponse[]> {
    return authRequest({
        method: 'PUT',
        url: `/comments/${values.commentId}`,
        data: {
            content: values.content,
        },
    });
}

export async function deleteComment(values: { commentId: string }): Promise<CommentResponse[]> {
    return authRequest({
        method: 'DELETE',
        url: `/comments/${values.commentId}`,
    });
}
