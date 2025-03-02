import { UserContextType } from '../types/usercontext.ts';
import { storageKeys } from '../constants/storagekeys.ts';
import { getEmptyContext } from './getemptycontext.ts';

export function getContext(): UserContextType {
    return JSON.parse(localStorage.getItem(storageKeys.context)!) ?? getEmptyContext();
}
