import { skipToken, useMutation, useQuery } from '@tanstack/react-query';
import { deletePost, getPostById, getPosts, getPostsByAuthor, postPost, putPost } from '../services/postservice.ts';
import { queryKeys } from '../../constants/querykeys.ts';
import { mutationKeys } from '../../constants/mutationkeys.ts';

export function usePostsQuery() {
    return useQuery({
        queryFn: getPosts,
        queryKey: [queryKeys.posts],
    });
}

export function usePostsByAuthorQuery() {
    return useQuery({
        queryFn: getPostsByAuthor,
        queryKey: [queryKeys.posts, queryKeys.author],
    });
}

export function usePostByIdQuery(id?: string) {
    return useQuery({
        queryFn: id ? () => getPostById(id) : skipToken,
        queryKey: [queryKeys.posts, id],
    });
}

export function usePostPostMutation() {
    return useMutation({
        mutationFn: postPost,
        mutationKey: [mutationKeys.post],
    });
}

export function usePostPutMutation() {
    return useMutation({
        mutationFn: putPost,
        mutationKey: [mutationKeys.post],
    });
}

export function usePostDeleteMutation() {
    return useMutation({
        mutationFn: deletePost,
        mutationKey: [mutationKeys.post],
    });
}
