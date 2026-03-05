import { authRequest } from './network.ts';
import {
    DeleteUserRequest,
    UpdateUserBasicRequest,
    UpdateUserPasswordRequest,
    UserResponse,
} from '../../types/usermodel.ts';

export async function getUser(): Promise<UserResponse> {
    return authRequest({
        method: 'GET',
        url: `/users/me?includePostCount=true&includeCommentCount=true`,
    });
}

export async function putUserBasic(values: UpdateUserBasicRequest) {
    const formData = new FormData();
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('dateOfBirth', values.dateOfBirth);
    if (values.avatar) {
        formData.append('avatar', values.avatar);
    }
    return authRequest({
        method: 'PUT',
        url: '/users/me',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export async function putUserPassword(values: UpdateUserPasswordRequest) {
    return authRequest({
        method: 'PUT',
        url: '/users/me/password',
        data: values,
    });
}

export async function deleteUser(values: DeleteUserRequest) {
    return authRequest({
        method: 'DELETE',
        url: '/users/me',
        data: values,
    });
}
