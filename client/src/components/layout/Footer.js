import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <Container>
      <div className='footer my-4 text-center'>
        Made with{' '}
        <span role='img' aria-label='heart'>
          ❤️
        </span>{' '}
        <a
          href='https://github.com/AchrafHamrit/tellme'
          target='_blank'
          rel='noopener noreferrer'
        >{`<Github />`}</a>
      </div>
    </Container>
  );
};

export default Footer;
