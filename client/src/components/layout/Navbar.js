import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faSignOutAlt,
  faEnvelope,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

// Actions
import { logout, loadUser } from '../../redux/actions/authActions';

// Images
import Logo from '../../images/logo.svg';

const NavbarComponent = (props) => {
  const { isAuthenticated, user, logout, loadUser } = props;

  useEffect(() => {
    loadUser();

    // eslint-disable-next-line
  }, []);

  const userMenu = (
    <>
      <Dropdown alignRight>
        <Dropdown.Toggle variant='outline-light'>
          Hey, <strong>{user && user.username}</strong>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Link
            to={`/user/${user ? user.username : ''}`}
            className='dropdown-item'
          >
            <FontAwesomeIcon className='icon mr-3' icon={faUser} size='lg' />
            Profile
          </Link>
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
          <button onClick={() => logout()} className='dropdown-item'>
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

        <Nav className='ml-auto'>{isAuthenticated ? userMenu : guestMenu}</Nav>
      </Container>
    </Navbar>
  );
};

const mapSateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapSateToProps, { logout, loadUser })(NavbarComponent);
