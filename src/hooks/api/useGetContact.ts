import { useQuery } from "@apollo/client";
import GET_CONTACT from "../../gql/query/getContact";
import GetContactResponse from "../types/GetContactResponse";

export default function useGetContact(id: number) {
  const { data, refetch, loading, error } = useQuery<GetContactResponse>(
    GET_CONTACT,
    {
      skip: id === -1,
      variables: { id },
    },
  );

  return {
    data,
    loading: loading && !data,
    error,
    refetch,
  };
}
