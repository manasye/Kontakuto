import React, { useState } from "react";
import Divider from "../../components/Divider";
import AllContact from "./AllContact";
import Favorite from "./Favorite";
import useGetAllContacts from "../../hooks/api/useGetAllContacts";
import withFavoritesContext from "../../context/FavoriteContext";

function ListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const {
    data: contactData,
    loading: isLoadingGetAllContacts,
    refetch,
  } = useGetAllContacts(searchQuery, page);

  return (
    <>
      <Favorite refetch={refetch} />
      <Divider />
      <AllContact
        contactData={contactData}
        isLoadingGetAllContacts={isLoadingGetAllContacts}
        refetch={refetch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        page={page}
        setPage={setPage}
      />
    </>
  );
}

export default withFavoritesContext(ListPage);
