import { gql } from "@apollo/client";

const EDIT_CONTACT = gql`
  mutation EDIT_CONTACT($id: Int!, $firstName: String!, $lastName: String!) {
    update_contact_by_pk(
      pk_columns: { id: $id }
      _set: { first_name: $firstName, last_name: $lastName }
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

export default EDIT_CONTACT;
