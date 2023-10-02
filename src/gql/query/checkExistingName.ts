import { gql } from "@apollo/client";

const CHECK_EXISTING_NAME = gql`
  query CHECK_EXISTING_NAME($firstName: String!, $lastName: String!) {
    contact(
      where: {
        _or: [
          { first_name: { _eq: $firstName }, last_name: { _eq: $lastName } }
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

export default CHECK_EXISTING_NAME;
