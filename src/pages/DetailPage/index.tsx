import React, { useCallback, useEffect, useState } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { useParams } from "react-router-dom";
import ContactInputForm from "./ContactInputForm";
import ContactDetail, { ContactDetailProps } from "./ContactDetail";
import Icons from "../../components/Icons";
import useGetContact from "../../hooks/api/useGetContact";
import BarSkeletonGroup from "../../components/BarSkeletonGroup";

enum PAGE_STATE {
  VIEW_MODE,
  EDIT_MODE,
}

const INITIAL_FORM_DATA = {
  firstName: "",
  lastName: "",
  phoneNumbers: [],
};

export default function DetailPage() {
  const [pageState, setPageState] = useState(PAGE_STATE.VIEW_MODE);
  const [formData, setFormData] =
    useState<ContactDetailProps>(INITIAL_FORM_DATA);

  const param = useParams();
  const isNewContact = param.id === "new";
  const { data: contactData, loading } = useGetContact(
    isNewContact ? -1 : Number(param.id)
  );

  useEffect(() => {
    if (isNewContact) {
      setPageState(PAGE_STATE.EDIT_MODE);
      setFormData(INITIAL_FORM_DATA);
    }
  }, [isNewContact]);

  useEffect(() => {
    if (contactData?.contact_by_pk) {
      setFormData({
        firstName: contactData?.contact_by_pk.first_name,
        lastName: contactData?.contact_by_pk.last_name,
        phoneNumbers:
          contactData?.contact_by_pk.phones?.map((ph) => ({
            value: ph.number,
          })) || [],
      });
    }
  }, [contactData?.contact_by_pk]);

  const setToEditMode = useCallback(() => {
    setPageState(PAGE_STATE.EDIT_MODE);
  }, []);

  const setToViewMode = useCallback(() => {
    setPageState(PAGE_STATE.VIEW_MODE);
  }, []);

  const renderBasedOnState = useCallback(() => {
    if (loading) {
      return (
        <div className="mt-16">
          <BarSkeletonGroup />
        </div>
      );
    }
    if (pageState === PAGE_STATE.VIEW_MODE) {
      return (
        <>
          <ContactDetail {...formData} />
          <Button onClick={setToEditMode}>
            <Icons name="edit" color="white" className="mr-4" /> Edit Contact
          </Button>
        </>
      );
    }

    return (
      <ContactInputForm
        {...formData}
        handleCancel={setToViewMode}
        isNew={isNewContact}
        setToViewMode={setToViewMode}
      />
    );
  }, [
    formData,
    isNewContact,
    loading,
    pageState,
    setToEditMode,
    setToViewMode,
  ]);

  return (
    <>
      <Title
        text={isNewContact ? "New Contact" : "Contact Detail"}
        withArrowBack
      />
      {renderBasedOnState()}
    </>
  );
}
