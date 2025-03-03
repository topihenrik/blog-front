import { authRequest, request } from './network.ts';
import { CommentInputModel, CommentOutputModel } from '../../types/commentmodel.ts';

export async function getCommentsByPostId(postId: string): Promise<CommentOutputModel[]> {
    return request({
        method: 'GET',
        url: `/comments/post/${postId}/`,
    });
}

export async function postComment(values: Omit<CommentInputModel, 'commentId'>): Promise<CommentOutputModel[]> {
    return authRequest({
        method: 'POST',
        url: `/comments`,
        data: {
            postId: values.postId,
            content: values.content,
        },
    });
}

export async function putComment(values: CommentInputModel): Promise<CommentOutputModel[]> {
    return authRequest({
        method: 'PUT',
        url: `/comments/${values.commentId}`,
        data: {
            postId: values.postId,
            content: values.content,
        },
    });
}

export async function deleteComment(values: Omit<CommentInputModel, 'content'>): Promise<CommentOutputModel[]> {
    return authRequest({
        method: 'DELETE',
        url: `/comments/${values.commentId}`,
    });
}
