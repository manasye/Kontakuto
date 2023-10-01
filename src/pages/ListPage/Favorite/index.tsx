import React, { SyntheticEvent, useCallback, useMemo } from 'react';
import Title from '../../../components/Title';
import Text from '../../../components/Text';
import { colorToken } from '../../../tokens/color';
import useGetContactListByIds from '../../../hooks/api/useGetContactListByIds';
import { mapContactData } from '../utils';
import ContactContainer from '../../../components/ContactContainer';
import ContactCard from '../../../components/ContactCard';
import { useNavigate } from 'react-router-dom';
import { useFavoritesContext } from '../../../context/FavoriteContext';
import useDeleteContact from '../../../hooks/api/useDeleteContact';
import useGetAllContacts from '../../../hooks/api/useGetAllContacts';

interface Props {
    searchQuery: string;
    page: number;
}

export default function Favorite({ searchQuery, page }: Props) {
    const navigate = useNavigate();
    const { favoriteIds, removeFavorite } = useFavoritesContext();
    const { data } = useGetContactListByIds(favoriteIds);
    const { deleteContact } = useDeleteContact();
    const { refetch } = useGetAllContacts(searchQuery, page);

    const favContacts = useMemo(() => {
        return data?.contact.map(mapContactData) || [];
    }, [data?.contact]);

    const navigateToContactDetail = useCallback(
        (id: number) => {
            navigate(`/detail/${id}`);
        },
        [navigate]
    );

    const handleToggleFav = useCallback(
        (e: SyntheticEvent, id: number) => {
            e.stopPropagation();
            removeFavorite(id);
        },
        [removeFavorite]
    );

    const handleDelete = useCallback(
        (e: SyntheticEvent, id: number) => {
            e.stopPropagation();
            deleteContact(id, {
                onSuccess: () => {
                    removeFavorite(id);
                    refetch();
                }
            });
        },
        [deleteContact, refetch, removeFavorite]
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
                            handleToggleFav={(e) =>
                                handleToggleFav(e, contact.id)
                            }
                            isFavorite
                        />
                    ))}
                </ContactContainer>
            ) : (
                <Text
                    text="No favorites found..."
                    color={colorToken.lightGray}
                />
            )}
        </>
    );
}
