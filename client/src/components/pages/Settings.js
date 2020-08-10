import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Container, Form, Button } from 'react-bootstrap';

// Actions
import {
  loadSettings,
  updateProfile,
  clearErrors,
} from '../../redux/actions/authActions';
import { setAlert } from '../../redux/actions/alertActions';

// App layout components
import Spinner from '../layout/Spinner';

// Utils
import { WEBSITE_NAME } from '../../utils/Data';

const Settings = (props) => {
  const {
    user,
    error,
    loading_settings,
    loadSettings,
    updateProfile,
    clearErrors,
    setAlert,
  } = props;

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    name: '',
    bio: '',
    gender: 0,
    allow_messages: false,
  });

  useEffect(() => {
    loadSettings();

    //eslint-disable-next-line
  }, []);

  const { username, email, name, bio, gender, allow_messages } = userData;

  const [passwords, setPasswords] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });

  const { old_password, new_password, confirm_password } = passwords;

  const onChange = (e) =>
    setUserData({ ...user, [e.target.name]: e.target.value });

  const onChangeGender = (e) =>
    setUserData({ ...userData, gender: parseInt(e.target.value) });

  const onChangeAllowMessages = (e) =>
    setUserData({
      ...userData,
      allow_messages: e.target.value === 'true' ? true : false,
    });

  const onChangePasswords = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  useEffect(() => {
    if (error && error.length) {
      if (typeof error === 'object') {
        error.forEach((err) => {
          setAlert(err.msg, 'danger');
        });
      } else {
        setAlert(error, 'danger');
      }

      clearErrors();
    }

    // eslint-disable-next-line
  }, [error]);

  useEffect(() => {
    if (user) {
      setUserData({ ...userData, ...user });
    }

    // eslint-disable-next-line
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();

    await updateProfile({
      allow_messages,
      name,
      bio,
      gender,
    });
  };

  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Settings`}</title>
      </Helmet>
      <Container>
        <div className='container-inner px-3 mt-4'>
          {loading_settings ? (
            <div className='text-center'>
              <Spinner />
            </div>
          ) : (
            <div className='settings mx-auto'>
              <h4 className='mb-3'>
                <strong>Your informations</strong>
              </h4>
              <Form className='form form-container' onSubmit={onSubmit}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Email'
                    name='email'
                    value={email}
                    readOnly
                  />
                  <Form.Text className='text-muted'>
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Username'
                    name='username'
                    value={username}
                    readOnly
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Fullname</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Fullname'
                    name='name'
                    value={name}
                    onChange={onChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Your bio</Form.Label>
                  <Form.Control
                    as='textarea'
                    placeholder='Your bio'
                    rows='2'
                    name='bio'
                    value={bio}
                    onChange={onChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as='select'
                    name='gender'
                    value={gender}
                    onChange={onChangeGender}
                  >
                    <option defaultValue value={3}>
                      Not defined
                    </option>
                    <option value={1}>Male</option>
                    <option value={2}>Female</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Allow receiving messages</Form.Label>
                  <Form.Control
                    as='select'
                    name='allow_messages'
                    value={allow_messages}
                    onChange={onChangeAllowMessages}
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Form.Control>
                </Form.Group>

                {/* <Form.Group>
                <Form.Label>New password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='New password'
                  name='password'
                  value={new_password}
                  onChange={onChangePasswords}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password confirmation</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password confirmation'
                  name='confirm_password'
                  value={confirm_password}
                  onChange={onChangePasswords}
                />
              </Form.Group> */}

                <div className='links d-flex align-items-center justify-content-end mt-4'>
                  {loading_settings ? (
                    <Spinner />
                  ) : (
                    <Button variant='primary' type='submit'>
                      Update
                    </Button>
                  )}
                </div>
              </Form>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

const mapSateToProps = (state) => ({
  user: state.auth.user,
  error: state.auth.error,
  loading_settings: state.auth.loading_settings,
});

export default connect(mapSateToProps, {
  loadSettings,
  updateProfile,
  clearErrors,
  setAlert,
})(Settings);
