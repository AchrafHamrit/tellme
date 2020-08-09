import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Container, Form, Button } from 'react-bootstrap';

// Actions
import { loadUserProfile } from '../../redux/actions/userActions';

// App layout components
import Spinner from '../layout/Spinner';

// Utils
import { WEBSITE_NAME } from '../../utils/Data';

// Images
import OtherPicture from '../../images/other.svg';
import MalePicture from '../../images/male.svg';
import FemalePicture from '../../images/female.svg';

const Profile = (props) => {
  const { match, user_profile, loading, loadUserProfile } = props;

  const [message, setMessage] = useState('');

  const onChange = (e) => setMessage(e.target.value);

  useEffect(() => {
    loadUserProfile(match.params.username);

    // eslint-disable-next-line
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  const { name, username, bio, gender, allow_messages } = user_profile || {};

  console.log(props);

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
            'Not found'
          ) : (
            <div className='profile mx-auto'>
              <img src={FemalePicture} alt='Female' className='picture' />

              <div className='user-details mt-4'>
                <h3 className='name'>Ashraf Hamrit</h3>
                <p className='bio'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati aperiam voluptate illo quo
                </p>
              </div>

              <Form className='form form-container mt-4' onSubmit={onSubmit}>
                <Form.Group>
                  <Form.Label>Your message</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows='3'
                    name='message'
                    value={message}
                    onChange={onChange}
                  />
                </Form.Group>

                <div className='links d-flex align-items-center justify-content-center mt-4'>
                  {false ? (
                    <Spinner />
                  ) : (
                    <Button variant='primary' type='submit'>
                      Send
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
  user_profile: state.user.user_profile,
  loading: state.user.loading,
  error: state.user.error,
});

export default connect(mapSateToProps, { loadUserProfile })(Profile);
