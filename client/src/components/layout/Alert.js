import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Alert = ({ alerts }) => {
  useEffect(() => {
    // Scroll top
    if (alerts && alerts.length) window.scrollTo(0, 0);
  }, [alerts]);

  return (
    alerts.length > 0 && (
      <Container>
        <div className='alerts mt-4'>
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`alert ${alert.type} text-center mb-2`}
            >
              <FontAwesomeIcon className='icon mr-2' icon={faInfoCircle} />
              {alert.message}
            </div>
          ))}
        </div>
      </Container>
    )
  );
};

const mapSateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapSateToProps, {})(Alert);
