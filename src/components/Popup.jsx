import React, { useEffect, useState } from 'react';
import './Popup.css';
import questions from '../questions.json'; // Import the questions JSON

const Popup = ({ onClose, onLearnMore }) => {
  const [currentWord, setCurrentWord] = useState({});

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const wordForToday = questions.find(word => word.date === today);
    setCurrentWord(wordForToday || {});
  }, []);

  return (
    <div className="popup-background">
      <div className="popup-wrapper">
        <div className="popup-container">
          <div className="popup-content">
            <div className="popup-header">
              <span>Word of the Day</span>
              <img
                src="/delete.jpeg"
                alt="Delete"
                className="popup-delete-icon"
                onClick={onClose}
              />
            </div>
            <div className="popup-body">
              <h2>{currentWord.word || 'No word available'}</h2>
            </div>
            <div className="popup-footer">
              <a href="#" className="popup-learn-more" onClick={onLearnMore}>Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
