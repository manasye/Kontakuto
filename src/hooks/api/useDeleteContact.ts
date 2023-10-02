import { useMutation } from '@apollo/client';
import DELETE_CONTACT from '../../gql/mutation/deleteContact';
import { useCallback } from 'react';
import Callback from '../types/Callback';

export default function useDeleteContact() {
    const [mutateDelete, { loading }] = useMutation(DELETE_CONTACT);

    const deleteContact = useCallback(
        async (id: number, { onSuccess, onError }: Callback) => {
            try {
                await mutateDelete({ variables: { id } });
                onSuccess?.();
            } catch (e) {
                onError?.(e as Error);
            }
        },
        [mutateDelete]
    );

    return {
        loading,
        deleteContact
    } as const;
}
