import React, { useCallback, useEffect, useState } from 'react';
import Title from '../../components/Title';
import Button from '../../components/Button';
import { useParams } from 'react-router-dom';
import ContactInputForm from './ContactInputForm';
import ContactDetail, { ContactDetailProps } from './ContactDetail';
import Icons from '../../components/Icons';

const data = {
    firstName: 'Alice',
    lastName: 'Brown',
    phoneNumbers: [
        { value: '08134455555' },
        { value: '08134455555' },
        { value: '08134455555' }
    ]
};

enum PAGE_STATE {
    VIEW_MODE,
    EDIT_MODE
}

export default function DetailPage() {
    const [pageState, setPageState] = useState(PAGE_STATE.VIEW_MODE);
    const [formData, setFormData] = useState<Partial<ContactDetailProps>>(data);
    const param = useParams();
    const isNewContant = param.id === 'new';

    useEffect(() => {
        if (isNewContant) {
            setPageState(PAGE_STATE.EDIT_MODE);
            setFormData({});
        }
    }, [isNewContant]);

    const setToEditMode = useCallback(() => {
        setPageState(PAGE_STATE.EDIT_MODE);
    }, []);

    const setToViewMode = useCallback(() => {
        setPageState(PAGE_STATE.VIEW_MODE);
    }, []);

    return (
        <>
            <Title
                text={isNewContant ? 'New Contact' : 'Contact Detail'}
                withArrowBack
            />
            {pageState === PAGE_STATE.VIEW_MODE ? (
                <>
                    <ContactDetail {...data} />
                    <Button onClick={setToEditMode}>
                        <Icons name="edit" color="white" className="mr-4" />{' '}
                        Edit Contact
                    </Button>
                </>
            ) : (
                <ContactInputForm {...formData} handleCancel={setToViewMode} />
            )}
        </>
    );
}
