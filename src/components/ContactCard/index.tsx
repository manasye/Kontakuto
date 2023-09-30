import React, { SyntheticEvent } from 'react';
import {
    ActionButtons,
    Avatar,
    ContactCardContainer,
    ContactRightSide,
    Name,
    PhoneNumber
} from './index.style';
import { generateColorFromInitials } from '../../utils/color';
import Icons from '../Icons';

interface ContactCardProps {
    name: string;
    phoneNumber: string;
    onClick?: () => void;
    handleDelete?: (e: SyntheticEvent) => void;
    handleFavorite?: (e: SyntheticEvent) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
    name,
    phoneNumber,
    onClick,
    handleDelete,
    handleFavorite
}) => {
    const initials = name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    const bgColor = generateColorFromInitials(initials);

    return (
        <ContactCardContainer onClick={onClick}>
            <Avatar bgColor={bgColor}>{initials}</Avatar>
            <ContactRightSide>
                <div>
                    <Name>{name}</Name>
                    <PhoneNumber>{phoneNumber}</PhoneNumber>
                </div>
                <ActionButtons>
                    <Icons
                        name="delete"
                        hoverColor="#FA6363"
                        fontSize="20px"
                        className="mr-4"
                        onClick={handleDelete}
                    />
                    <Icons
                        name="star"
                        hoverColor="#FFD700"
                        fontSize="20px"
                        onClick={handleFavorite}
                    />
                </ActionButtons>
            </ContactRightSide>
        </ContactCardContainer>
    );
};

export default ContactCard;
