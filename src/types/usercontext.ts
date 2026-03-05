import { Dispatch, SetStateAction } from 'react';

export interface UserContextType {
    id?: string;
    fullName?: string;
    avatarUrl?: string;
    token?: string;
}

export type UserContextValues = UserContextType & {
    set: Dispatch<SetStateAction<UserContextType>>;
    clear: () => void;
};
