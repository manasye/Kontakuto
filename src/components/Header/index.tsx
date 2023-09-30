import React, { useCallback } from 'react';
import {
    Button,
    ContentContainer,
    HeaderContainer,
    MainText
} from './index.style';
import { useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToNewContact = useCallback(() => {
        navigate('/detail/new');
    }, [navigate]);

    return (
        <HeaderContainer>
            <ContentContainer>
                <MainText>Kontakuto</MainText>
                {location.pathname === '/' && (
                    <Button onClick={navigateToNewContact}>Add New</Button>
                )}
            </ContentContainer>
        </HeaderContainer>
    );
};

export default Header;
