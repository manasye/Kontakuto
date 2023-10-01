import { gql } from '@apollo/client';

const GET_CONTACT_LIST_BY_IDS = gql`
    query GET_CONTACT_LIST_BY_IDS($ids: [Int!] = []) {
        contact(order_by: [{ first_name: asc }], where: { id: { _in: $ids } }) {
            id
            first_name
            last_name
            phones {
                number
            }
        }
    }
`;

export default GET_CONTACT_LIST_BY_IDS;
