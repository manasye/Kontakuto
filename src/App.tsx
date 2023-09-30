import React from 'react';
import './App.css';
import { SWRConfig } from 'swr';
import { client } from './lib/client';
import { RequestDocument } from 'graphql-request';
import { RouterProvider } from 'react-router-dom';
import router from './router';

type Variables = { [key: string]: unknown };

const fetcher = async (query: RequestDocument, variables: Variables) => {
    try {
        const response = await client.request(query, variables);
        return response;
    } catch (error) {
        throw error;
    }
};
function App() {
    return (
        <SWRConfig
            value={{
                fetcher
            }}>
            <RouterProvider router={router} />
        </SWRConfig>
    );
}

export default App;
