import { useQuery } from "@apollo/client";
import GET_CONTACT_LIST_BY_IDS from "../../gql/query/getContactListByIds";
import GetContactListResponse from "../types/GetContactListResponse";

export default function useGetContactListByIds(ids: number[]) {
  const { data, loading, error } = useQuery<GetContactListResponse>(
    GET_CONTACT_LIST_BY_IDS,
    {
      variables: {
        ids,
      },
    },
  );

  return {
    data,
    loading: loading && !data,
    error,
  };
}
