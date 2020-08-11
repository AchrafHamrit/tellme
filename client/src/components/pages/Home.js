import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Container, Row, Col, Button } from 'react-bootstrap';

// Utils
import { WEBSITE_NAME } from '../../utils/Data';

// Images
import HomeImage from '../../images/home.svg';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME}`}</title>
      </Helmet>

      <Container>
        <div className='container-inner px-3 mt-4 text-center'>
          <div className='home mx-auto align-items-center'>
            <Row>
              <Col>
                <img className='img img-fluid' src={HomeImage} alt='Home' />
              </Col>
            </Row>

            <Row className='mt-5'>
              <Col>
                <h3>
                  <strong>Send</strong> and <strong>receive</strong> <br />{' '}
                  Honest opinions anonymously.
                </h3>

                <Link to='/messages'>
                  <Button variant='primary' className='mt-3'>
                    Get started
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
