import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../constants/querykeys.ts';
import { mutationKeys } from '../../constants/mutationkeys.ts';
import { deleteUser, getUser, putUserBasic, putUserPassword } from '../services/userservice.ts';

export function useUserQuery() {
    return useQuery({
        queryFn: getUser,
        queryKey: [queryKeys.user],
    });
}

export function useUserBasicPutMutation() {
    return useMutation({
        mutationFn: putUserBasic,
        mutationKey: [mutationKeys.user],
    });
}

export function useUserPasswordPutMutation() {
    return useMutation({
        mutationFn: putUserPassword,
        mutationKey: [mutationKeys.user],
    });
}

export function useUserDeleteMutation() {
    return useMutation({
        mutationFn: deleteUser,
        mutationKey: [mutationKeys.user],
    });
}
