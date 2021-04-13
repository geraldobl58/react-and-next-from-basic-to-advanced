import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export const TextInput = ({ searchValue, handleChange }) => {
  return (
    <input 
      type="search"
      onChange={handleChange}
      value={searchValue}
      className="text-input"
      placeholder="Pesquisar"
    />
  )
}

TextInput.propTypes = {
  searchValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}