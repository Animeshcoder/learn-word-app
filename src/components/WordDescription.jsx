import React, { useState, useEffect } from 'react';
import questions from '../questions.json'; // Import the questions JSON

const WordDescription = ({ selectedDate }) => {
  const [currentWord, setCurrentWord] = useState({});

  useEffect(() => {
    const adjustedDate = new Date(selectedDate);
    adjustedDate.setDate(selectedDate.getDate() + 1); // Increment date by one
    const formattedDate = adjustedDate.toISOString().split('T')[0];
    const wordForDate = questions.find(word => word.date === formattedDate);
    setCurrentWord(wordForDate);
  }, [selectedDate]);

  if (!currentWord) {
    return (
      <div className="word-description">
        <h2>No word available for this date!</h2>
      </div>
    );
  }

  return (
    <div className="word-description">
      <h2>{currentWord.word}</h2>
      <p>{currentWord.description}</p>
    </div>
  );
};

export default WordDescription;
