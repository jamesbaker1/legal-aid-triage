// src/components/Header.js
import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand href="/">Legal Aid Support</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
