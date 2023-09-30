import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import Title from '../../components/Title';
import Button from '../../components/Button';
import { useParams } from 'react-router-dom';
import ContactInputForm from './ContactInputForm';
import ContactDetail from './ContactDetail';
import Icons from '../../components/Icons';

const data = {
    firstName: 'Alice',
    lastName: 'Brown',
    phoneNumbers: ['123-456-7890', '123-456-7890', '123-456-7890']
};

enum PAGE_STATE {
    VIEW_MODE,
    EDIT_MODE
}

export default function DetailPage() {
    const [pageState, setPageState] = useState(PAGE_STATE.VIEW_MODE);

    const setToEditMode = useCallback(() => {
        setPageState(PAGE_STATE.EDIT_MODE);
    }, []);

    const setToViewMode = useCallback(() => {
        setPageState(PAGE_STATE.VIEW_MODE);
    }, []);

    return (
        <>
            <Title text="Contact Detail" withArrowBack />
            {pageState === PAGE_STATE.VIEW_MODE ? (
                <>
                    <ContactDetail {...data} />
                    <Button onClick={setToEditMode}>
                        <Icons name="edit" color="white" className="mr-4" />{' '}
                        Edit Contact
                    </Button>
                </>
            ) : (
                <ContactInputForm {...data} handleCancel={setToViewMode} />
            )}
        </>
    );
}
