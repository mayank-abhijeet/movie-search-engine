import React from 'react';

const Card = ({ children, padded }) => {
  return <div className={`card ${padded ? 'padded' : ''}`}>{children}</div>;
};

export default Card;
