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
import { colorToken } from '../../tokens/color';

interface ContactCardProps {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    onClick?: () => void;
    handleDelete?: (e: SyntheticEvent) => void;
    handleFavorite?: (e: SyntheticEvent) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
    firstName,
    lastName,
    phoneNumber,
    onClick,
    handleDelete,
    handleFavorite
}) => {
    const initials = firstName[0] + lastName[0];
    const bgColor = generateColorFromInitials(initials);

    return (
        <ContactCardContainer onClick={onClick}>
            <Avatar bgColor={bgColor}>{initials}</Avatar>
            <ContactRightSide>
                <div>
                    <Name>
                        {firstName} {lastName}
                    </Name>
                    <PhoneNumber>{phoneNumber}</PhoneNumber>
                </div>
                <ActionButtons>
                    <Icons
                        name="delete"
                        hoverColor={colorToken.red}
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
