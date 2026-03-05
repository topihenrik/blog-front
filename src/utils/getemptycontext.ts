import { UserContextValues } from '../types/usercontext.ts';

export function getEmptyContext(): UserContextValues {
    return {
        id: undefined,
        fullName: undefined,
        avatarUrl: undefined,
        token: undefined,
        set: () => {},
        clear: () => {},
    };
}
