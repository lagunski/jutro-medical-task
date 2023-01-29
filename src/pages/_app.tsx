import '@/styles/globals.css'
import {ApolloProvider, HttpLink} from '@apollo/react-hooks';

import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'https://countries.trevorblades.com',
    }),
});

import type {AppProps} from 'next/app'

export default function App({Component, pageProps}: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}
