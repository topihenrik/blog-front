import { mutationKeys } from '../../constants/mutationkeys.ts';
import { postLogin, postSignUp } from '../services/authservice.ts';
import { useMutation } from '@tanstack/react-query';
import { useTokenLocalStorage } from '../../hooks/useTokenLocalStorage.ts';
import { useUserLocalStorage } from '../../hooks/useUserLocalStorage.ts';

export function useLoginMutation() {
    const [, setToken] = useTokenLocalStorage();
    const [, setUser] = useUserLocalStorage();
    return useMutation({
        mutationFn: postLogin,
        mutationKey: [mutationKeys.login],
        onSuccess: (data) => {
            setToken(data.token);
            setUser(data.user);
        },
    });
}

export function useSignUpMutation() {
    return useMutation({
        mutationFn: postSignUp,
        mutationKey: [mutationKeys.signup],
    });
}
