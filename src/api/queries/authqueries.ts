import { mutationKeys } from '../../constants/mutationkeys.ts';
import { postLogin, postSignUp } from '../services/authservice.ts';
import { useMutation } from '@tanstack/react-query';
import { useUserContext } from '../../hooks/useUserContext.tsx';

export function useLoginMutation() {
    const userContext = useUserContext();
    return useMutation({
        mutationFn: postLogin,
        mutationKey: [mutationKeys.login],
        onSuccess: (data) => {
            userContext.set({
                token: data.token,
                id: data.user.id,
                fullName: `${data.user.firstName} ${data.user.lastName}`,
                avatarUrl: data.user.avatar?.url,
            });
        },
    });
}

export function useSignUpMutation() {
    return useMutation({
        mutationFn: postSignUp,
        mutationKey: [mutationKeys.signup],
    });
}
