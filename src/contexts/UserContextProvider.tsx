import { ReactNode } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { storageKeys } from '../constants/storagekeys.ts';
import { UserContext } from './UserContext.tsx';
import { UserContextType } from '../types/usercontext.ts';
import { getEmptyContext } from '../utils/getemptycontext.ts';

export function UserContextProvider({ children }: { children: ReactNode }) {
    const [context, set, clear] = useLocalStorage<UserContextType>(storageKeys.context, getEmptyContext());
    return (
        <UserContext.Provider
            value={{
                set,
                clear,
                _id: context._id,
                full_name: context.full_name,
                avatar_url: context.avatar_url,
                token: context.token,
            }}>
            {children}
        </UserContext.Provider>
    );
}
