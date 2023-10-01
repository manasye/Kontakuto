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
import { default as PhoneNumberType } from '../../types/PhoneNumber';

interface ContactCardProps {
    firstName: string;
    lastName: string;
    phoneNumber: PhoneNumberType;
    onClick?: () => void;
    handleDelete?: (e: SyntheticEvent) => void;
    handleToggleFav?: (e: SyntheticEvent) => void;
    isFavorite?: boolean;
}

const ContactCard: React.FC<ContactCardProps> = ({
    firstName,
    lastName,
    phoneNumber,
    onClick,
    handleDelete,
    handleToggleFav,
    isFavorite
}) => {
    const initials = firstName[0].toUpperCase() + lastName[0].toUpperCase();
    const bgColor = generateColorFromInitials(initials);

    return (
        <ContactCardContainer onClick={onClick}>
            <Avatar bgColor={bgColor}>{initials}</Avatar>
            <ContactRightSide>
                <div>
                    <Name>
                        {firstName} {lastName}
                    </Name>
                    <PhoneNumber>{phoneNumber.number}</PhoneNumber>
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
                        color={isFavorite ? '#FFD700' : ''}
                        hoverColor="#FFD700"
                        fontSize="20px"
                        onClick={handleToggleFav}
                    />
                </ActionButtons>
            </ContactRightSide>
        </ContactCardContainer>
    );
};

export default ContactCard;
