import React from 'react';
import { observer } from 'mobx-react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { identityStore } from 'store';
import { urls } from '../constants';

const Header = () => {
  const { identity } = identityStore;
  const { isAuthenticated } = identity;
  const authButtonText = isAuthenticated ? 'Logout' : 'Login';
  const onClick = () => isAuthenticated ? identityStore.logout() : identityStore.login();

  return (
    <Navbar bg="dark" variant="dark">
      <LinkContainer to={urls.index}>
        <Navbar.Brand>Simple List</Navbar.Brand>
      </LinkContainer>
      <Nav className="mr-auto">
        <LinkContainer to={urls.products}>
          <Nav.Link>
            Products
          </Nav.Link>
        </LinkContainer>
      </Nav>
      <Button variant="outline-light" onClick={onClick}>{authButtonText}</Button>
    </Navbar>
  );
};

const WithObserver = observer(Header);

export { WithObserver as Header };
