import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';

// Utils
import calcDays from '../../utils/calcDays';

const MessageCard = ({
  message,
  toggleFavAction,
  isLoading,
  handleShowModal,
}) => {
  const { is_fav, _id, content, date } = message || {};

  const [isFav, setIsFav] = useState(is_fav);
  const toggleFav = async () => {
    setIsFav(!isFav);
    await toggleFavAction(_id);
  };

  const handleShow = () => {
    handleShowModal(content);
  };

  if (isLoading)
    return (
      <div className='message-card text-left p-4'>
        <div className='card-inner d-flex flex-column justify-content-between'>
          <p className='content mb-3'>
            <Skeleton count={2} height={10} />
          </p>

          <div className='card-bottom d-flex align-items-center justify-content-between'>
            <button className='link-secondary'>
              <Skeleton count={1} height={24} width={120} />
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className='message-card text-left p-4'>
      <div className='fav-container py-2 px-2' onClick={toggleFav}>
        <FontAwesomeIcon
          className={`icon ${isFav && 'is-fav'}`}
          icon={faHeart}
        />
      </div>
      <div className='card-inner d-flex flex-column justify-content-between'>
        <p className='content mb-3'>
          {content.length > 50 ? content.substring(0, 50) + '..' : content}
        </p>

        <div className='card-bottom d-flex align-items-center justify-content-between'>
          <button className='link-secondary' onClick={handleShow}>
            View message
          </button>
          <span className='date'>{calcDays(date)}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
