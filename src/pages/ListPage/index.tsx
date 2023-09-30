import React from 'react';
import Title from '../../components/Title';
import Text from '../../components/Text';
import Divider from '../../components/Divider';
import AllContact from './AllContact';
import { colorToken } from '../../tokens/color';

export default function ListPage() {
    return (
        <>
            <Title text="Favorites (0)" />
            <Text text="No favorites found..." color={colorToken.lightGray} />
            <Divider />
            <AllContact />
        </>
    );
}
