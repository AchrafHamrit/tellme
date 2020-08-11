import React from 'react';
import { Modal } from 'react-bootstrap';

const MessageModal = (props) => {
  const { show, message, onHide } = props;

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Body className='text-center py-4'>
          <>
            <h5 className='title mb-3'>Message</h5>
            <span className='content'>{message}</span>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MessageModal;
