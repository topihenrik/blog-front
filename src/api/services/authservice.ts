import { request } from './network.ts';
import { LoginRequest, LoginResponse, SignUpRequest } from '../../types/authmodel.ts';

export async function postSignUp(values: SignUpRequest) {
    const formData = new FormData();
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('dateOfBirth', values.dateOfBirth);
    formData.append('password', values.password);
    if (values.avatar) {
        formData.append('avatar', values.avatar);
    }

    return request({
        method: 'POST',
        url: '/auth/signup',
        data: values,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export async function postLogin(values: LoginRequest): Promise<LoginResponse> {
    return request({
        method: 'POST',
        url: '/auth/login',
        data: values,
    });
}
