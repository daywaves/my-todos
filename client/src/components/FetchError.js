import React from 'react';
import PropTypes from 'prop-types';

const FetchError = ({ message, onRetry }) => (
  <div>
    <div className="panel-block">
      <p className="content">{message}</p>
    </div>
    <div className="panel-block">
      <button
        className="button is-primary is-fullwidth is-outlined"
        type="button"
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  </div>
);

FetchError.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default FetchError;
