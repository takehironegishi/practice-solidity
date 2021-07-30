import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import { Header } from './Header';

export const Layout = ({ children }) => (
  <Container>
    <Head>
      <link
        async
        rel="stylesheet"
        href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css"
      />
    </Head>
    <Header />
    {children}
  </Container>
);
