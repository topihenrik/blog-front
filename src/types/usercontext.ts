import { Dispatch, SetStateAction } from 'react';

export interface UserContextType {
    _id: string | undefined;
    full_name: string | undefined;
    avatar_url: string | undefined;
    token: string | undefined;
}

export type UserContextValues = UserContextType & {
    set: Dispatch<SetStateAction<UserContextType>>;
    clear: () => void;
};
