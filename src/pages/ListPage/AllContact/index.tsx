import React, { SyntheticEvent, useCallback, useMemo } from 'react';
import ContactContainer from '../../../components/ContactContainer';
import Title from '../../../components/Title';
import ContactCard from '../../../components/ContactCard';
import SearchInput from '../../../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import Icons from '../../../components/Icons';
import styled from '@emotion/styled';
import useGetAllContacts, {
    PER_PAGE
} from '../../../hooks/api/useGetAllContacts';
import Pagination from '../../../components/Pagination';
import BarSkeletonGroup from '../../../components/BarSkeletonGroup';
import { mapContactData } from '../utils';
import { useFavoritesContext } from '../../../context/FavoriteContext';
import { colorToken } from '../../../tokens/color';
import Text from '../../../components/Text';
import useDeleteContact from '../../../hooks/api/useDeleteContact';

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    h2 {
        margin-bottom: 0;
    }
`;

interface Props {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function AllContact({
    searchQuery,
    setSearchQuery,
    page,
    setPage
}: Props) {
    const navigate = useNavigate();
    const { addNewFavorite } = useFavoritesContext();
    const {
        data: contactData,
        loading,
        refetch
    } = useGetAllContacts(searchQuery, page);
    const { deleteContact } = useDeleteContact();

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setPage(1);
    };

    const contacts = useMemo(() => {
        return contactData?.contact.map(mapContactData) || [];
    }, [contactData?.contact]);

    const navigateToContactDetail = useCallback(
        (id: number) => {
            navigate(`/detail/${id}`);
        },
        [navigate]
    );

    const navigateToNewContact = useCallback(() => {
        navigate('/detail/new');
    }, [navigate]);

    const handleDelete = useCallback(
        (e: SyntheticEvent, id: number) => {
            e.stopPropagation();
            deleteContact(id, {
                onSuccess: () => {
                    refetch();
                }
            });
        },
        [deleteContact, refetch]
    );

    const handleFavorite = useCallback(
        (e: SyntheticEvent, id: number) => {
            e.stopPropagation();
            addNewFavorite(id);
        },
        [addNewFavorite]
    );

    const totalItems = contactData?.contact_aggregate.aggregate.count || 0;
    const totalPages = Math.ceil(totalItems / PER_PAGE);

    return (
        <>
            <TitleContainer>
                <Title text={`All Contacts (${totalItems})`} />
                <Button onClick={navigateToNewContact}>
                    <Icons name="add" color="white" className="mr-4" /> New
                    Contact
                </Button>
            </TitleContainer>
            <SearchInput value={searchQuery} onChange={handleSearchChange} />
            {loading ? (
                <BarSkeletonGroup />
            ) : totalItems === 0 ? (
                <Text
                    text="No contacts found..."
                    color={colorToken.lightGray}
                />
            ) : (
                <ContactContainer>
                    {contacts.map((contact) => (
                        <ContactCard
                            {...contact}
                            key={contact.id}
                            onClick={() => navigateToContactDetail(contact.id)}
                            handleDelete={(e) => handleDelete(e, contact.id)}
                            handleToggleFav={(e) =>
                                handleFavorite(e, contact.id)
                            }
                        />
                    ))}
                </ContactContainer>
            )}

            {totalPages > 1 && (
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            )}
        </>
    );
}
