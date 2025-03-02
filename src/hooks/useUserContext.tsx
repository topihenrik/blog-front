import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext.tsx';

export function useUserContext() {
    return useContext(UserContext);
}
