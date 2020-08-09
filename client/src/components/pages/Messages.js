import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Container } from 'react-bootstrap';

// Actions
import {
  getMessages,
  toggleFav,
  clearErrors,
} from '../../redux/actions/messageActions';
import { setAlert } from '../../redux/actions/alertActions';

// App layout components
import Spinner from '../layout/Spinner';
import MessageCard from '../layout/MessageCard';

// Utils
import { WEBSITE_NAME } from '../../utils/Data';

// Images
import OtherPicture from '../../images/other.svg';
import MalePicture from '../../images/male.svg';
import FemalePicture from '../../images/female.svg';

const Messages = (props) => {
  const {
    user,
    messages,
    loading,
    error,
    getMessages,
    toggleFav,
    clearErrors,
    setAlert,
  } = props;

  useEffect(() => {
    getMessages();

    // eslint-disable-next-line
  }, []);

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

  const { name, username, gender } = user || {};

  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Massages`}</title>
      </Helmet>
      <Container>
        <div className='container-inner px-3 mt-4 text-center'>
          <div className='messages mx-auto'>
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
              <h3 className='title'>Your messages</h3>
              <h6 className='name'>{name || username}</h6>
            </div>

            {loading ? (
              <div className='mt-5'>
                <Spinner />
              </div>
            ) : !messages || !messages.length ? (
              <div className='mt-5'>No messages</div>
            ) : (
              <div className='cards-container mt-5'>
                {messages.map((message) => (
                  <MessageCard
                    key={message._id}
                    message={message}
                    toggleFavAction={toggleFav}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

const mapSateToProps = (state) => ({
  user: state.auth.user,
  messages: state.message.messages,
  loading: state.message.loading,
  error: state.message.error,
});

export default connect(mapSateToProps, {
  getMessages,
  toggleFav,
  clearErrors,
  setAlert,
})(Messages);
