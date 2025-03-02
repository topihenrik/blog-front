import { authRequest, request } from './network.ts';
import { CommentInputModel, CommentOutputModel } from '../../types/commentmodel.ts';

export async function getCommentsByPostId(postId: string): Promise<CommentOutputModel[]> {
    return request({
        method: 'GET',
        url: `/posts/${postId}/comments`,
    });
}

export async function postComment(values: Omit<CommentInputModel, 'commentId'>): Promise<CommentOutputModel[]> {
    return authRequest({
        method: 'POST',
        url: `/posts/${values.postId}/comments`,
        data: {
            content: values.content,
        },
    });
}

export async function putComment(values: CommentInputModel): Promise<CommentOutputModel[]> {
    return authRequest({
        method: 'PUT',
        url: `/posts/${values.postId}/comments/${values.commentId}`,
        data: {
            content: values.content,
        },
    });
}

export async function deleteComment(values: Omit<CommentInputModel, 'content'>): Promise<CommentOutputModel[]> {
    return authRequest({
        method: 'DELETE',
        url: `/posts/${values.postId}/comments/${values.commentId}`,
    });
}
