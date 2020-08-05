import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisH,
  faSignOutAlt,
  faEnvelope,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

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
          <Link to='/messages' className='dropdown-item'>
            <FontAwesomeIcon
              className='icon mr-3'
              icon={faEnvelope}
              size='lg'
            />
            Messages
          </Link>
          <Link to='/settings' className='dropdown-item'>
            <FontAwesomeIcon className='icon mr-3' icon={faCog} size='lg' />
            Settings
          </Link>
          <Dropdown.Divider></Dropdown.Divider>
          <button
            onClick={() => console.log('logout')}
            className='dropdown-item'
          >
            <FontAwesomeIcon
              className='icon mr-3'
              icon={faSignOutAlt}
              size='lg'
            />
            Logout
          </button>
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

        <Nav className='ml-auto'>{false ? userMenu : guestMenu}</Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
