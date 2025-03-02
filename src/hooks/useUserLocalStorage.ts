import { useLocalStorage } from 'usehooks-ts';
import { storageKeys } from '../constants/storagekeys.ts';
import { User } from '../types/user.ts';

export function useUserLocalStorage() {
    return useLocalStorage<User | null>(storageKeys.user, null);
}
