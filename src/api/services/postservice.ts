import { authRequest, request } from './network.ts';
import { CreatePostRequest, PostResponse, UpdatePostRequest } from '../../types/postmodel.ts';
import { getContext } from '../../utils/getcontext.ts';

export async function getPosts(): Promise<PostResponse[]> {
    return request({
        method: 'GET',
        url: '/posts?includeCommentCount=true',
    });
}

export async function getPostsByAuthor(): Promise<PostResponse[]> {
    return authRequest({
        method: 'GET',
        url: '/posts/?onlyPersonal=true&includeCommentCount=true',
    });
}

export async function getPostById(id: string): Promise<PostResponse> {
    // Special functionality where unpublished posts can be acquired if you are the author
    let headers;
    const context = getContext();
    if (context.token) {
        headers = {
            Authorization: `Bearer ${context.token}`,
        };
    }

    return request({
        method: 'GET',
        url: `/posts/${id}?includeCommentCount=true`,
        headers,
    });
}

export async function postPost(values: CreatePostRequest) {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('isPublished', String(values.isPublished));
    if (values.image) {
        formData.append('image', values.image);
    }

    return authRequest({
        method: 'POST',
        url: '/posts',
        data: values,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export async function putPost(values: UpdatePostRequest & { postId: string }) {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('isPublished', String(values.published));
    // formData.append('postId', values.postId);
    if (values.image) {
        formData.append('image', values.image);
    }

    return authRequest({
        method: 'PUT',
        url: `/posts/${values.postId}`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export async function deletePost(values: { postId: string; confirmation: string }) {
    return authRequest({
        method: 'DELETE',
        url: `/posts/${values.postId}`,
        data: {
            confirmation: values.confirmation,
        },
    });
}
