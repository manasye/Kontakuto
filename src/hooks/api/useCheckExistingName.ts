import { useQuery } from "@apollo/client";
import { useCallback } from "react";
import CHECK_EXISTING_NAME from "../../gql/query/checkExistingName";
import Contact from "../../types/Contact";

export default function useCheckExistingName() {
  const { refetch, loading, error } = useQuery<{ contact: Contact[] }>(
    CHECK_EXISTING_NAME,
    {
      skip: true,
    }
  );

  const checkExistingName = useCallback(
    async (firstName: string, lastName: string) => {
      try {
        const res = await refetch({ firstName, lastName });
        return res.data.contact.length > 0;
      } catch (e) {
        console.error(e);
      }
    },
    [refetch]
  );

  return { checkExistingName, loading, error } as const;
}
