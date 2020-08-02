import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

// Images
import Logo from '../../images/logo.svg';

const NavbarComponent = () => {
  const userMenu = (
    <>
      <Dropdown alignRight>
        <Dropdown.Toggle variant='outline-light'>
          <FontAwesomeIcon icon={faEllipsisH} size='lg' />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
          <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
          <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );

  const guestMenu = (
    <>
      <Link to='/login'>
        <Button variant='outline-light'>Get started</Button>
      </Link>
    </>
  );

  return (
    <Navbar bg='white' expand='lg'>
      <Container>
        <Link to='/'>
          <Navbar.Brand>
            <img src={Logo} alt='tellme' />
          </Navbar.Brand>
        </Link>

        <Nav className='ml-auto'>{true ? userMenu : guestMenu}</Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
