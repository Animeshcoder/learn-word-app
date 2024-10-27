import React, { useEffect, useState, useRef } from 'react';
import './Popup.css';
import questions from '../questions.json';

const Popup = ({ onClose, onLearnMore }) => {
  const [currentWord, setCurrentWord] = useState({});
  const hasRunEffect = useRef(false); // Track if useEffect has run

  useEffect(() => {
    if (hasRunEffect.current) return; // Prevent reruns
    hasRunEffect.current = true;

    const todayDate = new Date().toLocaleDateString('en-CA'); // Format to YYYY-MM-DD
    const lastShownDate = localStorage.getItem('lastShownWordDate');

    // If the word for today has already been shown, retrieve and display it
    if (lastShownDate === todayDate) {
      const savedWord = JSON.parse(localStorage.getItem('currentWord'));
      setCurrentWord(savedWord || {});
      return;
    }

    let nextWord;

    if (lastShownDate) {
      const nextDate = new Date(lastShownDate);
      nextDate.setDate(nextDate.getDate() + 1); // Increment by one day
      const nextFormattedDate = nextDate.toLocaleDateString('en-CA');
      nextWord = questions.find(word => word.date === nextFormattedDate);
    }

    // If no matching word is found (end of list), reset to the first word
    if (!nextWord) {
      nextWord = questions[0];
    }

    // Store today's date and the selected word in localStorage
    localStorage.setItem('lastShownWordDate', nextWord.date);
    localStorage.setItem('currentWord', JSON.stringify(nextWord));
    setCurrentWord(nextWord);
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
