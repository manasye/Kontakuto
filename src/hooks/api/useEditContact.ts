import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { ContactDetailProps } from "../../pages/DetailPage/ContactDetail";
import Callback from "../../types/Callback";
import EDIT_CONTACT from "../../gql/mutation/editContact";
import EditContactResponse from "../../types/EditContactResponse";

export default function useEditContact(id: number) {
  const [mutateEdit, { loading: isLoadingEditContact }] =
    useMutation<EditContactResponse>(EDIT_CONTACT, {
      refetchQueries: ["GET_CONTACTS"],
    });

  const postEditContact = useCallback(
    async (data: ContactDetailProps, { onSuccess, onError }: Callback) => {
      try {
        await mutateEdit({
          variables: {
            id,
            firstName: data.firstName,
            lastName: data.lastName,
          },
        });
        onSuccess?.();
      } catch (e) {
        console.error(e);
        onError?.(e as Error);
      }
    },
    [id, mutateEdit]
  );

  return {
    loading: isLoadingEditContact,
    postEditContact,
  } as const;
}
