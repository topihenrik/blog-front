import { UserContextValues } from '../types/usercontext.ts';

export function getEmptyContext(): UserContextValues {
    return {
        _id: undefined,
        full_name: undefined,
        avatar_url: undefined,
        token: undefined,
        set: () => {},
        clear: () => {},
    };
}
