import React, { useState } from 'react';
import Divider from '../../components/Divider';
import AllContact from './AllContact';
import Favorite from './Favorite';
import { FavoritesProvider } from '../../context/FavoriteContext';

export default function ListPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);

    return (
        <FavoritesProvider>
            <Favorite searchQuery={searchQuery} page={page} />
            <Divider />
            <AllContact
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                page={page}
                setPage={setPage}
            />
        </FavoritesProvider>
    );
}
