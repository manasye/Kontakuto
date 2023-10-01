import React, { useCallback } from 'react';
import { ContentContainer, HeaderContainer, MainText } from './index.style';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();

    const navigateToHome = useCallback(() => {
        navigate('/');
    }, [navigate]);

    return (
        <HeaderContainer>
            <ContentContainer>
                <MainText onClick={navigateToHome}>Kontakuto</MainText>
            </ContentContainer>
        </HeaderContainer>
    );
};

export default Header;
