import React, { SyntheticEvent, useCallback, useMemo } from 'react';
import ContactContainer from '../../../components/ContactContainer';
import Title from '../../../components/Title';
import ContactCard from '../../../components/ContactCard';
import SearchInput from '../../../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import Icons from '../../../components/Icons';
import styled from '@emotion/styled';
import { PER_PAGE } from '../../../hooks/api/useGetAllContacts';
import Pagination from '../../../components/Pagination';
import BarSkeletonGroup from '../../../components/BarSkeletonGroup';
import { mapContactData } from '../utils';
import { useFavoritesContext } from '../../../context/FavoriteContext';
import { colorToken } from '../../../tokens/color';
import Text from '../../../components/Text';
import useDeleteContact from '../../../hooks/api/useDeleteContact';
import { withSwal } from 'react-sweetalert2';
import GetContactListResponse from '../../../hooks/types/GetContactListResponse';
import { ApolloQueryResult, OperationVariables } from '@apollo/client';

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
    contactData: GetContactListResponse;
    isLoadingGetAllContacts: boolean;
    refetch: (
        variables?: Partial<OperationVariables>
    ) => Promise<ApolloQueryResult<GetContactListResponse>>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    swal: { fire: (param: unknown) => Promise<{ isConfirmed: boolean }> };
}

function AllContact({
    contactData,
    isLoadingGetAllContacts,
    refetch,
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    swal
}: Props) {
    const navigate = useNavigate();
    const { addNewFavorite } = useFavoritesContext();
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
            swal.fire({
                icon: 'question',
                title: 'One second',
                text: 'Are you sure want to delete this contact?',
                showCancelButton: true
            }).then((res) => {
                if (res.isConfirmed) {
                    deleteContact(id, {
                        onSuccess: () => {
                            refetch();
                        }
                    });
                }
            });
        },
        [deleteContact, refetch, swal]
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
            {isLoadingGetAllContacts ? (
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

export default withSwal(AllContact);
