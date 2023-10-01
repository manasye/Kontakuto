import { gql } from '@apollo/client';

const GET_ALL_CONTACTS = gql`
    query GET_ALL_CONTACTS(
        $query: String = ""
        $offset: Int = 0
        $limit: Int = 10
        $excludedIds: [Int!] = []
    ) {
        contact_aggregate(
            where: {
                id: { _nin: $excludedIds }
                _or: [
                    { first_name: { _iregex: $query } }
                    { last_name: { _iregex: $query } }
                    { phones: { number: { _iregex: $query } } }
                ]
            }
        ) {
            aggregate {
                count
            }
        }
        contact(
            offset: $offset
            limit: $limit
            order_by: [{ first_name: asc }]
            where: {
                id: { _nin: $excludedIds }
                _or: [
                    { first_name: { _iregex: $query } }
                    { last_name: { _iregex: $query } }
                    { phones: { number: { _iregex: $query } } }
                ]
            }
        ) {
            id
            first_name
            last_name
            phones {
                number
            }
        }
    }
`;

export default GET_ALL_CONTACTS;
