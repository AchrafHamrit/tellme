import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Container, Form, Button } from 'react-bootstrap';

// App layout components
import Spinner from '../layout/Spinner';

// Utils
import { WEBSITE_NAME } from '../../utils/Data';

// Images
import OtherPicture from '../../images/other.svg';
import MalePicture from '../../images/male.svg';
import FemalePicture from '../../images/female.svg';

const Profile = () => {
  const [message, setMessage] = useState('');

  const onChange = (e) => setMessage(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Profile`}</title>
      </Helmet>
      <Container>
        <div className='container-inner px-3 mt-4 text-center'>
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
        </div>
      </Container>
    </>
  );
};

export default Profile;
