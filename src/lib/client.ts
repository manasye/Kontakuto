import { GraphQLClient } from 'graphql-request';

export const client = new GraphQLClient(
    'https://wpe-hiring.tokopedia.net/graphql'
);
