import React from 'react';
import Helmet from 'react-helmet';
import { Container } from 'react-bootstrap';

// Utils
import { WEBSITE_NAME } from '../../utils/Data';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Not found`}</title>
      </Helmet>

      <Container>
        <div className='container-inner px-3 mt-4 text-center'>
          <div className='home mx-auto'>
            <h1 className='title'>Home</h1>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
