import { authRequest, request } from './network.ts';
import { PostInputModel, PostOutputModel } from '../../types/postmodel.ts';
import { storageKeys } from '../../constants/storagekeys.ts';

export async function getPosts(): Promise<PostOutputModel[]> {
    return request({
        method: 'GET',
        url: '/posts',
    });
}

export async function getPostsByAuthor(): Promise<PostOutputModel[]> {
    return authRequest({
        method: 'GET',
        url: '/posts/author',
    });
}

export async function getPostById(id: string): Promise<PostOutputModel> {
    // Special functionality where unpublished posts can be acquired if you are the author
    const token = localStorage.getItem(storageKeys.token);
    let headers;
    if (token) {
        headers = {
            Authorization: `Bearer ${token.split('"')[1]}`,
        };
    }

    return request({
        method: 'GET',
        url: `/posts/${id}`,
        headers,
    });
}

export async function postPost(values: PostInputModel) {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('description', values.description);
    formData.append('published', String(values.published));
    if (values.photo) {
        formData.append('photo', values.photo);
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

export async function putPost(values: PostInputModel & { postID: string }) {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('description', values.description);
    formData.append('published', String(values.published));
    formData.append('postID', values.postID);
    if (values.photo) {
        formData.append('photo', values.photo);
    }

    return authRequest({
        method: 'PUT',
        url: '/posts',
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
