import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

// Utils
import calcDays from '../../utils/calcDays';

const MessageCard = ({ message, toggleFavAction }) => {
  const { is_fav, _id, content, date } = message;

  const [isFav, setIsFav] = useState(is_fav);
  const toggleFav = async () => {
    setIsFav(!isFav);
    await toggleFavAction(_id);
  };

  return (
    <div className='message-card text-left p-4'>
      <div className='fav-container py-2 px-2' onClick={toggleFav}>
        <FontAwesomeIcon
          className={`icon ${isFav && 'is-fav'}`}
          icon={faHeart}
        />
      </div>
      <div className='card-inner d-flex flex-column justify-content-between'>
        <p className='content mb-3'>{content}</p>

        <div className='card-bottom d-flex align-items-center justify-content-between'>
          <button className='link-secondary'>View message</button>
          <span className='date'>{calcDays(date)}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
