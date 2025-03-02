import { useLocalStorage } from 'usehooks-ts';
import { storageKeys } from '../constants/storagekeys.ts';

export function useTokenLocalStorage() {
    return useLocalStorage<string | null>(storageKeys.token, null);
}
