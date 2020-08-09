import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const MessageCard = (props) => {
  return (
    <div className='message-card text-left p-4'>
      <div className='fav-container py-2 px-2'>
        <FontAwesomeIcon className='icon' icon={faHeart} />
      </div>
      <div className='card-inner d-flex flex-column justify-content-between'>
        <p className='content mb-3'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias cumque
          nam.
        </p>

        <div className='card-bottom d-flex align-items-center justify-content-between'>
          <button className='link-secondary'>View message</button>
          <span className='date'>3d ago</span>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
