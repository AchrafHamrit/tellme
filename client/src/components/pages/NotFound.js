import React from 'react';
import Helmet from 'react-helmet';
import { Container, Form, Button } from 'react-bootstrap';

// Utils
import { WEBSITE_NAME } from '../../utils/Data';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Not found`}</title>
      </Helmet>

      <Container>
        <div className='container-inner px-3 mt-4 text-center'>
          <div className='not-found mx-auto'>
            <h1 className='title'>404</h1>
            <h5 className='subtitle'>This page does not exist!</h5>
          </div>
        </div>
      </Container>
    </>
  );
};

export default NotFound;
