import { skipToken, useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../constants/querykeys.ts';
import { deleteComment, getCommentsByPostId, postComment, putComment } from '../services/commentservice.ts';
import { mutationKeys } from '../../constants/mutationkeys.ts';

export function useCommentsByPostIdQuery(postId?: string) {
    return useQuery({
        queryFn: postId ? () => getCommentsByPostId(postId) : skipToken,
        queryKey: [queryKeys.comments],
    });
}

export function useCommentPostMutation() {
    return useMutation({
        mutationFn: postComment,
        mutationKey: [mutationKeys.comment],
    });
}

export function useCommentPutMutation() {
    return useMutation({
        mutationFn: putComment,
        mutationKey: [mutationKeys.comment],
    });
}

export function useCommentDeleteMutation() {
    return useMutation({
        mutationFn: deleteComment,
        mutationKey: [mutationKeys.comment],
    });
}
