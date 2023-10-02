import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { ContactDetailProps } from '../../pages/DetailPage/ContactDetail';
import Callback from '../types/Callback';
import EDIT_CONTACT from '../../gql/mutation/editContact';
import EditContactResponse from '../types/EditContactResponse';
import DELETE_PHONE_NUMBERS from '../../gql/mutation/deletePhoneNumbers';
import ADD_PHONE_NUMBERS from '../../gql/mutation/addPhoneNumbers';
import EDIT_PHONE_NUMBER from '../../gql/mutation/editPhoneNumber';
import { comparePhoneNumbers } from '../../utils/phoneNumber';
import useGetContact from './useGetContact';

export default function useEditContact(id: number) {
    const [mutateEditName, { loading: isLoadingEditName }] =
        useMutation<EditContactResponse>(EDIT_CONTACT);

    const [deletePhoneNumbers, { loading: isLoadingDeletePhoneNumbers }] =
        useMutation(DELETE_PHONE_NUMBERS);
    const [addPhoneNumbers, { loading: isLoadingAddPhoneNumbers }] =
        useMutation(ADD_PHONE_NUMBERS);
    const [editPhoneNumber, { loading: isLoadingEditPhoneNumber }] =
        useMutation(EDIT_PHONE_NUMBER);

    const { refetch } = useGetContact(id);

    const postEditContact = useCallback(
        async (
            data: ContactDetailProps,
            oldData: ContactDetailProps,
            { onSuccess, onError }: Callback
        ) => {
            try {
                if (
                    data.firstName !== oldData.firstName ||
                    data.lastName !== oldData.lastName
                ) {
                    // there is changes on name
                    await mutateEditName({
                        variables: {
                            id,
                            firstName: data.firstName,
                            lastName: data.lastName
                        }
                    });
                }

                // Check phone number changes
                const { newNumbers, editedNumbers, deletedNumbers } =
                    comparePhoneNumbers(
                        oldData.phoneNumbers,
                        data.phoneNumbers
                    );

                if (newNumbers.length > 0) {
                    await addPhoneNumbers({
                        variables: {
                            phones: newNumbers.map((ph) => ({
                                number: ph.value,
                                contact_id: id
                            }))
                        }
                    });
                }
                if (deletedNumbers.length > 0) {
                    await deletePhoneNumbers({
                        variables: {
                            ids: deletedNumbers
                                .filter((id) => id)
                                .map((el) => el.id)
                        }
                    });
                }
                if (editedNumbers.length > 0) {
                    const allEditedRequests = editedNumbers.map((ph) =>
                        editPhoneNumber({
                            variables: {
                                ids: {
                                    contact_id: id,
                                    number: ph.id ?? ''
                                },
                                number: ph.value
                            }
                        })
                    );
                    await Promise.all(allEditedRequests);
                }

                refetch();
                onSuccess?.();
            } catch (e) {
                onError?.(e as Error);
            }
        },
        [
            addPhoneNumbers,
            deletePhoneNumbers,
            editPhoneNumber,
            id,
            mutateEditName,
            refetch
        ]
    );

    return {
        loading:
            isLoadingEditName ||
            isLoadingDeletePhoneNumbers ||
            isLoadingAddPhoneNumbers ||
            isLoadingEditPhoneNumber,
        postEditContact
    } as const;
}
