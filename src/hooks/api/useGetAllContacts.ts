import { useQuery } from '@apollo/client';
import GET_ALL_CONTACTS from '../../gql/query/getAllContacts';
import debounce from 'lodash.debounce';
import { useEffect } from 'react';
import GetContactListResponse from '../types/GetContactListResponse';
import { useFavoritesContext } from '../../context/FavoriteContext';

export const PER_PAGE = 10;
const DEBOUNCE_INTERVAL = 300;

export default function useGetAllContacts(query = '', page = 1) {
    const { favoriteIds } = useFavoritesContext();

    const { data, refetch, loading, error } = useQuery<GetContactListResponse>(
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    return {
        data,
        refetch,
        loading: loading && !data,
        error
    };
}
