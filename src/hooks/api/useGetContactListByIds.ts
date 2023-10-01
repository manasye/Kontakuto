import { useQuery } from '@apollo/client';
import GET_CONTACT_LIST_BY_IDS from '../../gql/query/getContactListByIds';
import GetContactsResponse from '../../types/GetContactsResponse';

export default function useGetContactListByIds(ids: number[]) {
    const { data, loading, error } = useQuery<GetContactsResponse>(
        GET_CONTACT_LIST_BY_IDS,
        {
            variables: {
                ids
            }
        }
    );

    return {
        data,
        loading: loading && !data,
        error
    };
}
