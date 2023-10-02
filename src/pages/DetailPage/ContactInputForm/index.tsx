import React, { useCallback, useState } from "react";
import TextInput from "../../../components/Input/Input";
import styled from "@emotion/styled";
import { ContactDetailProps, NameContainer } from "../ContactDetail";
import { Label } from "../../../components/Input/Input.style";
import Button from "../../../components/Button";
import Icons from "../../../components/Icons";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { phoneNumberCheck } from "../../../utils/regex";
import useAddContact from "../../../hooks/api/useAddContact";
import { withSwal } from "react-sweetalert2";
import { useNavigate } from "react-router-dom";

interface Props extends Partial<ContactDetailProps> {
  setToViewMode: () => void;
  handleCancel: () => void;
  isNew?: boolean;
}

const Container = styled.form`
  padding-bottom: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 24px;
`;

function InputForm({
  firstName,
  lastName,
  phoneNumbers = [],
  handleCancel,
  isNew,
  setToViewMode,
  swal,
}: Props & { swal: { fire: (param: unknown) => void } }) {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    trigger,
  } = useForm<ContactDetailProps>({
    mode: "onBlur",
    defaultValues: {
      firstName,
      lastName,
      phoneNumbers,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "phoneNumbers",
  });

  const { postAddContact, loading: isLoadingAddContact } = useAddContact();

  const onSubmit = useCallback(
    (data: ContactDetailProps) => {
      if (isNew) {
        postAddContact(data, {
          onSuccess: (id) => {
            swal.fire({
              title: "Success",
              text: "Contact has been added successfully",
              icon: "success",
            });
            setToViewMode();
            navigate(`/detail/${id}`);
          },
          onError: () => {
            swal.fire({
              title: "Error",
              text: "Phone number can't be duplicate",
              icon: "error",
            });
          },
        });
      }
    },
    [isNew, navigate, postAddContact, setToViewMode, swal]
  );

  const validateFirstName = useCallback((value: string) => {
    if (value) {
      return true;
    } else {
      return "First name is required";
    }
  }, []);

  const validateLastName = useCallback((value: string) => {
    if (value) {
      return true;
    } else {
      return "Last name is required";
    }
  }, []);

  const validatePhoneNumber = useCallback(({ value }: { value: string }) => {
    return phoneNumberCheck(value) || "Phone Number must be valid";
  }, []);

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <NameContainer>
        <Controller
          name="firstName"
          control={control}
          defaultValue={firstName || ""}
          rules={{ validate: validateFirstName }}
          render={({ field }) => (
            <TextInput
              label="First Name"
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                trigger("firstName");
              }}
              errorMessage={errors.firstName?.message}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue={lastName || ""}
          rules={{ validate: validateLastName }}
          render={({ field }) => (
            <TextInput
              label="Last Name"
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                trigger("lastName");
              }}
              errorMessage={errors.lastName?.message}
            />
          )}
        />
      </NameContainer>

      <div className="mb-8">
        <Label>Phone Number</Label>
      </div>
      {fields.map((field, index) => (
        <Controller
          key={field.id}
          name={`phoneNumbers.${index}`}
          control={control}
          rules={{ validate: validatePhoneNumber }}
          render={({ field }) => (
            <TextInput
              value={field.value.value}
              onChange={(value) => {
                field.onChange({ value });
                trigger(`phoneNumbers.${index}`);
              }}
              appendedButton={
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <Icons name="delete" color="white" />
                </Button>
              }
              errorMessage={errors.phoneNumbers?.[index]?.message}
            />
          )}
        />
      ))}

      <Button onClick={() => append({ value: "" })}>
        <Icons name="add" color="white" className="mr-4" /> New Number
      </Button>

      <ButtonContainer>
        <Button variant="secondary" onClick={handleCancel} className="mr-8">
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={!isValid}>
          Save
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default withSwal(InputForm);
