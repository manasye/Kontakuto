import React from 'react';
import Divider from '../../components/Divider';
import AllContact from './AllContact';
import Favorite from './Favorite';
import { FavoritesProvider } from '../../context/FavoriteContext';

export default function ListPage() {
    return (
        <FavoritesProvider>
            <Favorite />
            <Divider />
            <AllContact />
        </FavoritesProvider>
    );
}
