export interface UserOutputModel {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    dob: string;
    password: string;
    avatar: Avatar;
    creation_date: string;
}

export interface Avatar {
    is_default: boolean;
    public_id?: string | null;
    originalName: string;
    url: string;
}

export interface ProfileOutputModel {
    user: UserOutputModel;
    postCount: number;
    commentCount: number;
}

export interface UserBasicInputModel {
    first_name: string;
    last_name: string;
    email: string;
    dob: string;
    avatar: File | null;
}

export interface UserPasswordInputModel {
    old_password: string;
    password: string;
    password_confirm: string;
}

export interface UserDeleteInputModel {
    email: string;
    password: string;
}
