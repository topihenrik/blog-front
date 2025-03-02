import { request } from './network.ts';
import { LoginInputModel, LoginOutputModel, SignupInputModel } from '../../types/authmodel.ts';

export async function postSignUp(values: SignupInputModel) {
    const formData = new FormData();
    formData.append('first_name', values.first_name);
    formData.append('last_name', values.last_name);
    formData.append('email', values.email);
    formData.append('dob', values.dob);
    formData.append('password', values.password);
    formData.append('password_confirm', values.password_confirm);
    if (values.avatar) {
        formData.append('avatar', values.avatar);
    }

    return request({
        method: 'POST',
        url: '/signup',
        data: values,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export async function postLogin(values: LoginInputModel): Promise<LoginOutputModel> {
    return request({
        method: 'POST',
        url: '/login',
        data: values,
    });
}
