// src/components/Footer.js
import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light text-center py-3 mt-auto">
      <Container>
        <p className="mb-0">&copy; {new Date().getFullYear()} All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
