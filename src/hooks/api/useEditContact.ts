import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { ContactDetailProps } from '../../pages/DetailPage/ContactDetail';
import Callback from '../types/Callback';
import EDIT_CONTACT from '../../gql/mutation/editContact';
import EditContactResponse from '../types/EditContactResponse';
// import DELETE_PHONE_NUMBERS from "../../gql/mutation/deletePhoneNumbers";
// import ADD_PHONE_NUMBERS from "../../gql/mutation/addPhoneNumbers";
// import EDIT_PHONE_NUMBER from "../../gql/mutation/editPhoneNumber";

export default function useEditContact(id: number) {
    const [mutateEditName, { loading: isLoadingEditName }] =
        useMutation<EditContactResponse>(EDIT_CONTACT, {
            refetchQueries: ['GET_CONTACTS']
        });

    // const [deletePhoneNumbers, { loading: isLoadingDeletePhoneNumbers }] =
    //   useMutation(DELETE_PHONE_NUMBERS);
    // const [addPhoneNumbers, { loading: isLoadingAddPhoneNumbers }] =
    //   useMutation(ADD_PHONE_NUMBERS);
    // const [editPhoneNumber, { loading: isLoadingEditPhoneNumber }] =
    //   useMutation(EDIT_PHONE_NUMBER);

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
                onSuccess?.();
            } catch (e) {
                onError?.(e as Error);
            }
        },
        [id, mutateEditName]
    );

    return {
        loading: isLoadingEditName,
        // ||
        // isLoadingDeletePhoneNumbers ||
        // isLoadingAddPhoneNumbers ||
        // isLoadingEditPhoneNumber
        postEditContact
    } as const;
}
