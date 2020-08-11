import React, { useEffect, useState } from 'react';
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
import MessageCard from '../layout/MessageCard';
import MessageModal from '../layout/MessageModal';

// Utils
import { WEBSITE_NAME } from '../../utils/Data';

// Images
import OtherPicture from '../../images/other.svg';
import MalePicture from '../../images/male.svg';
import FemalePicture from '../../images/female.svg';

const Messages = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const handleShowModal = (msg) => {
    setMessage(msg);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
    setMessage('');
  };

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
              <div className='cards-container mt-5'>
                <MessageCard isLoading={true} />
                <MessageCard isLoading={true} />
              </div>
            ) : !messages || !messages.length ? (
              <div className='empty'>
                <h6 className='title mt-5'>
                  Empty inbox{' '}
                  <span role='img' aria-label='sad'>
                    😥
                  </span>
                </h6>
                <div className='share mt-5'>
                  <h6>Share your profile link with friends</h6>
                  <p className='mt-2'>
                    <code className='py-2 px-3'>
                      {`${window.location.origin.toString()}/u/${username}`}
                    </code>
                  </p>
                </div>
              </div>
            ) : (
              <div className='cards-container mt-5'>
                {messages.map((message) => (
                  <MessageCard
                    key={message._id}
                    message={message}
                    toggleFavAction={toggleFav}
                    handleShowModal={handleShowModal}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <MessageModal
          show={showModal}
          message={message}
          onHide={handleHideModal}
        />
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
