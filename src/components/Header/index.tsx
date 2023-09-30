import React, { useCallback } from 'react';
import { ContentContainer, HeaderContainer, MainText } from './index.style';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../Button';
import Icons from '../Icons';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();

    const navigateToHome = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const navigateToNewContact = useCallback(() => {
        navigate('/detail/new');
    }, [navigate]);

    const shouldShowAddBtn = params.id !== 'new';

    return (
        <HeaderContainer>
            <ContentContainer>
                <MainText onClick={navigateToHome}>Kontakuto</MainText>
                {shouldShowAddBtn && (
                    <Button onClick={navigateToNewContact}>
                        <Icons name="add" color="white" className="mr-4" /> New
                        Contact
                    </Button>
                )}
            </ContentContainer>
        </HeaderContainer>
    );
};

export default Header;
