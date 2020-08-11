import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Container, Form, Button } from 'react-bootstrap';

// Actions
import { loadUserProfile } from '../../redux/actions/userActions';
import { sendMessage, clearErrors } from '../../redux/actions/messageActions';
import { setAlert } from '../../redux/actions/alertActions';

// App layout components
import Spinner from '../layout/Spinner';

// Utils
import { WEBSITE_NAME } from '../../utils/Data';

// Images
import OtherPicture from '../../images/other.svg';
import MalePicture from '../../images/male.svg';
import FemalePicture from '../../images/female.svg';

const Profile = (props) => {
  const {
    match,
    user,
    user_profile,
    loading,
    loading_send,
    error_send,
    loadUserProfile,
    sendMessage,
    clearErrors,
    setAlert,
  } = props;
  const { _id, name, username, bio, gender, allow_messages } =
    user_profile || {};

  const [message, setMessage] = useState('');
  const [is_sent, setIsSent] = useState(false);

  const onChange = (e) => setMessage(e.target.value);

  useEffect(() => {
    loadUserProfile(match.params.username);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadUserProfile(match.params.username);

    // eslint-disable-next-line
  }, [match]);

  useEffect(() => {
    if (error_send && error_send.length) {
      if (typeof error_send === 'object') {
        error_send.forEach((err) => {
          setAlert(err.msg, 'danger');
        });
      } else {
        setAlert(error_send, 'danger');
      }

      clearErrors();
    }

    // eslint-disable-next-line
  }, [error_send]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (message === '') {
      setAlert('Message cannot be empty', 'danger');
      return;
    }

    await sendMessage({ user_id: _id, content: message });

    if (!error_send) {
      setIsSent(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | ${
          loading ? 'Loading...' : username || 'Not found'
        }`}</title>
      </Helmet>
      <Container>
        <div className='container-inner px-3 mt-4 text-center'>
          {loading ? (
            <Spinner />
          ) : !user_profile ? (
            <div className='not-found mx-auto'>
              <h1 className='title'>404</h1>
              <h5 className='subtitle'>This page does not exist!</h5>
            </div>
          ) : (
            <div className='profile mx-auto'>
              <img
                className='picture'
                src={
                  gender === 1
                    ? MalePicture
                    : gender === 2
                    ? FemalePicture
                    : OtherPicture
                }
                alt='Profile'
              />

              <div className='user-details mt-4'>
                <h3 className='name'>{name || username}</h3>
                <p className='bio'>
                  {bio || 'This user does not have a bio 🤭'}
                </p>
              </div>

              {!user || user._id !== _id ? (
                allow_messages ? (
                  <Form
                    className='form form-container mt-4'
                    onSubmit={onSubmit}
                  >
                    <Form.Group>
                      <Form.Label>Your message</Form.Label>
                      <Form.Control
                        as='textarea'
                        rows='3'
                        name='message'
                        value={message}
                        onChange={onChange}
                        disabled={is_sent}
                      />
                    </Form.Group>

                    <div className='links d-flex align-items-center justify-content-center mt-4'>
                      {loading_send ? (
                        <Spinner />
                      ) : is_sent ? (
                        <div className='message-sent'>Message sent!</div>
                      ) : (
                        <Button variant='primary' type='submit'>
                          Send
                        </Button>
                      )}
                    </div>
                  </Form>
                ) : (
                  <div className='mt-4'>
                    <h6>Receiving messages is disabled</h6>
                  </div>
                )
              ) : (
                <div className='share mt-5'>
                  <h6>Share your profile link with friends</h6>
                  <p className='mt-2'>
                    <code className='py-2 px-3'>
                      {/* http://localhost:3000/u/achraf */}
                      {`${window.location.origin.toString()}/u/${username}`}
                    </code>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

const mapSateToProps = (state) => ({
  user: state.auth.user,
  user_profile: state.user.user_profile,
  loading: state.user.loading,
  loading_send: state.message.loading_send,
  error_send: state.message.error_send,
});

export default connect(mapSateToProps, {
  loadUserProfile,
  sendMessage,
  clearErrors,
  setAlert,
})(Profile);
