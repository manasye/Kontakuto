import { useQuery } from '@apollo/client';
import GET_ALL_CONTACTS from '../../gql/query/getAllContacts';
import debounce from 'lodash.debounce';
import { useEffect } from 'react';
import GetContactsResponse from '../../types/GetContactsResponse';
import { useFavoritesContext } from '../../context/FavoriteContext';

export const PER_PAGE = 10;
const DEBOUNCE_INTERVAL = 300;

export default function useGetAllContacts(query = '', page = 1) {
    const { favoriteIds } = useFavoritesContext();

    const { data, refetch, loading, error } = useQuery<GetContactsResponse>(
        GET_ALL_CONTACTS,
        {
            variables: {
                limit: PER_PAGE,
                offset: 0,
                excludedIds: favoriteIds
            }
        }
    );

    useEffect(() => {
        const callRefetch = debounce(() => {
            refetch({ offset: 0, query });
        }, DEBOUNCE_INTERVAL);
        callRefetch();
        return () => {
            callRefetch.cancel();
        };
    }, [query, refetch]);

    useEffect(() => {
        refetch({
            offset: (page - 1) * PER_PAGE
        });
    }, [page, refetch]);

    return {
        data,
        loading: loading && !data,
        error
    };
}
