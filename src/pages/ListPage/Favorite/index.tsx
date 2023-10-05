import React, { SyntheticEvent, memo, useCallback, useMemo } from "react";
import Title from "../../../components/Title";
import Text from "../../../components/Text";
import { colorToken } from "../../../tokens/color";
import useGetContactListByIds from "../../../hooks/api/useGetContactListByIds";
import { mapContactData } from "../utils";
import ContactContainer from "../../../components/ContactContainer";
import ContactCard from "../../../components/ContactCard";
import { useNavigate } from "react-router-dom";
import { useFavoritesContext } from "../../../context/FavoriteContext";
import useDeleteContact from "../../../hooks/api/useDeleteContact";
import { withSwal } from "react-sweetalert2";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import GetContactListResponse from "../../../hooks/types/GetContactListResponse";

interface Props {
  refetch: (
    variables?: Partial<OperationVariables>,
  ) => Promise<ApolloQueryResult<GetContactListResponse>>;
  swal: { fire: (param: unknown) => Promise<{ isConfirmed: boolean }> };
}

function Favorite({ refetch, swal }: Props) {
  const navigate = useNavigate();
  const { favoriteIds, removeFavorite } = useFavoritesContext();
  const { data } = useGetContactListByIds(favoriteIds);
  const { deleteContact } = useDeleteContact();

  const favContacts = useMemo(() => {
    return data?.contact.map(mapContactData) || [];
  }, [data?.contact]);

  const navigateToContactDetail = useCallback(
    (id: number) => {
      navigate(`/detail/${id}`);
    },
    [navigate],
  );

  const handleToggleFav = useCallback(
    (e: SyntheticEvent, id: number) => {
      e.stopPropagation();
      removeFavorite(id);
    },
    [removeFavorite],
  );

  const handleDelete = useCallback(
    (e: SyntheticEvent, id: number) => {
      e.stopPropagation();
      swal
        .fire({
          icon: "question",
          title: "One second",
          text: "Are you sure want to delete this contact?",
          showCancelButton: true,
        })
        .then((res) => {
          if (res.isConfirmed) {
            deleteContact(id, {
              onSuccess: () => {
                removeFavorite(id);
                setTimeout(() => {
                  refetch();
                }, 0);
              },
            });
          }
        });
    },
    [deleteContact, refetch, removeFavorite, swal],
  );

  return (
    <>
      <Title text={`Favorites (${favContacts.length})`} />
      {favContacts.length ? (
        <ContactContainer>
          {favContacts.map((contact) => (
            <ContactCard
              {...contact}
              key={contact.id}
              onClick={() => navigateToContactDetail(contact.id)}
              handleDelete={(e) => {
                handleDelete(e, contact.id);
              }}
              handleToggleFav={(e) => handleToggleFav(e, contact.id)}
              isFavorite
            />
          ))}
        </ContactContainer>
      ) : (
        <Text text="No favorites found..." color={colorToken.lightGray} />
      )}
    </>
  );
}

export default withSwal(memo(Favorite));
