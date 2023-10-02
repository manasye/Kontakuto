import ADD_CONTACT from '../../gql/mutation/addContact';
import { useMutation } from '@apollo/client';
import AddContactResponse from '../types/AddContactResponse';
import { useCallback } from 'react';
import { ContactDetailProps } from '../../pages/DetailPage/ContactDetail';
import Callback from '../types/Callback';

export default function useAddContact() {
    const [mutateAdd, { loading: isLoadingAddContact }] =
        useMutation<AddContactResponse>(ADD_CONTACT, {
            refetchQueries: ['GET_CONTACTS']
        });

    const postAddContact = useCallback(
        async (data: ContactDetailProps, { onSuccess, onError }: Callback) => {
            try {
                let res = await mutateAdd({
                    variables: {
                        data: {
                            first_name: data.firstName,
                            last_name: data.lastName,
                            phones: {
                                data: data.phoneNumbers.map((ph) => ({
                                    number: ph.value
                                }))
                            }
                        }
                    }
                });
                onSuccess?.(res.data?.insert_contact_one.id);
            } catch (e) {
                onError?.(e as Error);
            }
        },
        [mutateAdd]
    );

    return {
        loading: isLoadingAddContact,
        postAddContact
    } as const;
}
