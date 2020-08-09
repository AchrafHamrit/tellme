import React from 'react';
import Helmet from 'react-helmet';
import { Container } from 'react-bootstrap';

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
  let gender = 1;
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
              <h6 className='name'>Ashraf Hamrit</h6>
            </div>

            <div className='cards-container mt-5'>
              <MessageCard />
              <MessageCard />
              <MessageCard />
              <MessageCard />
              <MessageCard />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Messages;
