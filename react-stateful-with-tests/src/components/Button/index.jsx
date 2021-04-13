import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export const Button  = ({ disabled = false, onClickPosts, text }) => (
  <button 
    disabled={disabled} 
    onClick={onClickPosts} 
    className="button"
  >
    {text}
  </button>
);

Button.defaultProps = {
  disabled: false
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClickPosts: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}