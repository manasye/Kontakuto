import React from 'react';
import {
    ActionButton,
    ActionButtons,
    Avatar,
    ContactCardContainer,
    ContactRightSide,
    Name,
    PhoneNumber
} from './index.style';
import { generateColorFromInitials } from '../../utils/color';

interface ContactCardProps {
    name: string;
    phoneNumber: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ name, phoneNumber }) => {
    const initials = name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    const bgColor = generateColorFromInitials(initials);

    return (
        <ContactCardContainer>
            <Avatar bgColor={bgColor}>{initials}</Avatar>
            <ContactRightSide>
                <div>
                    <Name>{name}</Name>
                    <PhoneNumber>{phoneNumber}</PhoneNumber>
                </div>
                <ActionButtons>
                    <ActionButton title="Favorite">⭐</ActionButton>
                    <ActionButton title="Delete">❌</ActionButton>
                </ActionButtons>
            </ContactRightSide>
        </ContactCardContainer>
    );
};

export default ContactCard;
