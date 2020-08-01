import React from 'react';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

const NavbarComponent = () => {
  return (
    <Navbar bg='white' expand='lg'>
      <Container className='justify-content-between'>
        <Navbar.Brand href='#home'>Logo</Navbar.Brand>
        <Nav className='ml-auto'>
          <Button variant='outline-light'>Get started</Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
