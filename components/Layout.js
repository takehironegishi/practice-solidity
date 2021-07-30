import { Container } from 'semantic-ui-react';
import { Header } from './Header';

export const Layout = ({ children }) => (
  <Container>
    <Header />
    {children}
  </Container>
);
