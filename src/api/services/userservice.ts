import { authRequest } from './network.ts';
import {
    ProfileOutputModel,
    UserBasicInputModel,
    UserDeleteInputModel,
    UserPasswordInputModel,
} from '../../types/usermodel.ts';

export async function getUser(): Promise<ProfileOutputModel> {
    return authRequest({
        method: 'GET',
        url: '/user',
    });
}

export async function putUserBasic(values: UserBasicInputModel) {
    const formData = new FormData();
    formData.append('first_name', values.first_name);
    formData.append('last_name', values.last_name);
    formData.append('email', values.email);
    formData.append('dob', values.dob);
    if (values.avatar) {
        formData.append('avatar', values.avatar);
    }
    return authRequest({
        method: 'PUT',
        url: '/user/basic',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export async function putUserPassword(values: UserPasswordInputModel) {
    return authRequest({
        method: 'PUT',
        url: '/user/password',
        data: values,
    });
}

export async function deleteUser(values: UserDeleteInputModel) {
    return authRequest({
        method: 'DELETE',
        url: '/user',
        data: values,
    });
}
