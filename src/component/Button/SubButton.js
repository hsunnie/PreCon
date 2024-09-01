import React from 'react';
import './SubButton.css';

const SubButton = ({ imageUrl, text, number, handleClick }) => {
  return (
    <div className="SubButton" onClick={handleClick}>
      <div className="SubButton-icon" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className="SubButton-text">
        {number}. {text}
      </div>
    </div>
  );
}

export default SubButton;
