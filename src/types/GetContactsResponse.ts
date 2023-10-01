import Contact from './Contact';

export default interface GetContactsResponse {
    contact: Contact[];
    contact_aggregate: {
        aggregate: {
            count: number;
        };
    };
}
