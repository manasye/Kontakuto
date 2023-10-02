import React, { useCallback } from 'react';
import TextInput from '../../../components/Input/Input';
import styled from '@emotion/styled';
import { ContactDetailProps, NameContainer } from '../ContactDetail';
import { Label } from '../../../components/Input/Input.style';
import Button from '../../../components/Button';
import Icons from '../../../components/Icons';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { phoneNumberCheck, specialCharacterCheck } from '../../../utils/regex';
import useAddContact from '../../../hooks/api/useAddContact';
import { withSwal } from 'react-sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import useEditContact from '../../../hooks/api/useEditContact';
import useCheckExistingName from '../../../hooks/api/useCheckExistingName';

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
    firstName = '',
    lastName = '',
    phoneNumbers = [],
    handleCancel,
    isNew,
    setToViewMode,
    swal
}: Props & { swal: { fire: (param: unknown) => void } }) {
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { errors, isValid, isDirty },
        trigger,
        setError
    } = useForm<ContactDetailProps>({
        mode: 'onBlur',
        defaultValues: {
            firstName,
            lastName,
            phoneNumbers
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'phoneNumbers'
    });

    const param = useParams();
    const contactId = param.id === 'new' ? -1 : Number(param.id);
    const { checkExistingName, loading: isLoadingCheckExistingName } =
        useCheckExistingName(contactId);
    const { postAddContact, loading: isLoadingAddContact } = useAddContact();
    const { postEditContact, loading: isLoadingEditContact } =
        useEditContact(contactId);

    const onSubmit = useCallback(
        async (data: ContactDetailProps) => {
            const isThereExistingName = await checkExistingName(
                data.firstName,
                data.lastName
            );
            if (isThereExistingName) {
                setError('firstName', {
                    type: 'manual',
                    message: 'Name must be unique'
                });
                setError('lastName', {
                    type: 'manual',
                    message: 'Name must be unique'
                });
                return;
            }

            if (isNew) {
                postAddContact(data, {
                    onSuccess: (id) => {
                        swal.fire({
                            title: 'Success',
                            text: 'Contact has been added successfully',
                            icon: 'success'
                        });

                        setToViewMode();
                        navigate(`/detail/${id}`, { replace: true });
                    },
                    onError: () => {
                        swal.fire({
                            title: 'Error',
                            text: "Phone number can't be duplicate",
                            icon: 'error'
                        });
                    }
                });
            } else {
                postEditContact(
                    data,
                    { firstName, lastName, phoneNumbers },
                    {
                        onSuccess: () => {
                            swal.fire({
                                title: 'Success',
                                text: 'Contact has been edited successfully',
                                icon: 'success'
                            });
                            setToViewMode();
                        },
                        onError: () => {
                            swal.fire({
                                title: 'Error',
                                text: "Phone number can't be duplicate",
                                icon: 'error'
                            });
                        }
                    }
                );
            }
        },
        [
            checkExistingName,
            firstName,
            isNew,
            lastName,
            navigate,
            phoneNumbers,
            postAddContact,
            postEditContact,
            setError,
            setToViewMode,
            swal
        ]
    );

    const validateFirstName = useCallback(async (value: string) => {
        if (value) {
            if (specialCharacterCheck(value)) {
                return 'Name must not contain special character';
            } else {
                return true;
            }
        } else {
            return 'First name is required';
        }
    }, []);

    const validateLastName = useCallback(async (value: string) => {
        if (value) {
            if (specialCharacterCheck(value)) {
                return 'Name must not contain special character';
            } else {
                return true;
            }
        } else {
            return 'Last name is required';
        }
    }, []);

    const validatePhoneNumber = useCallback(({ value }: { value: string }) => {
        return phoneNumberCheck(value) || 'Phone Number must be valid';
    }, []);

    return (
        <Container onSubmit={handleSubmit(onSubmit)}>
            <NameContainer>
                <Controller
                    name="firstName"
                    control={control}
                    defaultValue={firstName || ''}
                    rules={{ validate: validateFirstName }}
                    render={({ field }) => (
                        <TextInput
                            label="First Name"
                            value={field.value}
                            onChange={(value) => {
                                field.onChange(value);
                                trigger('firstName');
                            }}
                            errorMessage={errors.firstName?.message}
                        />
                    )}
                />
                <Controller
                    name="lastName"
                    control={control}
                    defaultValue={lastName || ''}
                    rules={{ validate: validateLastName }}
                    render={({ field }) => (
                        <TextInput
                            label="Last Name"
                            value={field.value}
                            onChange={(value) => {
                                field.onChange(value);
                                trigger('lastName');
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
                                    onClick={() => remove(index)}>
                                    <Icons name="delete" color="white" />
                                </Button>
                            }
                            errorMessage={errors.phoneNumbers?.[index]?.message}
                        />
                    )}
                />
            ))}

            <Button onClick={() => append({ value: '' })}>
                <Icons name="add" color="white" className="mr-4" /> New Number
            </Button>

            <ButtonContainer>
                <Button
                    variant="secondary"
                    onClick={handleCancel}
                    className="mr-8">
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                    disabled={!isValid || !isDirty}
                    loading={
                        isLoadingAddContact ||
                        isLoadingEditContact ||
                        isLoadingCheckExistingName
                    }
                    className="min-w-80">
                    Save
                </Button>
            </ButtonContainer>
        </Container>
    );
}

export default withSwal(InputForm);
