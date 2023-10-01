import Contact from './Contact';

export default interface GetContactListResponse {
    contact: Contact[];
    contact_aggregate: {
        aggregate: {
            count: number;
        };
    };
}
