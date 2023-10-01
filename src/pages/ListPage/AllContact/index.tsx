import React, { SyntheticEvent, useCallback, useMemo, useState } from 'react';
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

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    h2 {
        margin-bottom: 0;
    }
`;

export default function AllContact() {
    const navigate = useNavigate();
    const { addNewFavorite } = useFavoritesContext();
    const [searchValue, setSearchValue] = useState('');
    const [page, setPage] = useState(1);
    const { data: contactData, loading } = useGetAllContacts(searchValue, page);

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
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

    const handleDelete = useCallback((e: SyntheticEvent) => {
        e.stopPropagation();
    }, []);

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
            <SearchInput value={searchValue} onChange={handleSearchChange} />
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
                            handleDelete={handleDelete}
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
