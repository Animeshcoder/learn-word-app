import React, { useState, useEffect } from 'react';
import questions from '../questions.json'; // Import the questions JSON

const WordDescription = ({ selectedDate }) => {
  const [currentWord, setCurrentWord] = useState({});

  useEffect(() => {
    // Create a new Date object from selectedDate
    const adjustedDate = new Date(selectedDate);
    console.log("Original selectedDate:", selectedDate);
    
    // Set the time to midnight to avoid issues with time affecting date comparison
    adjustedDate.setHours(0, 0, 0, 0); // Set to midnight in local time
  
    // Format the date to YYYY-MM-DD using toLocaleDateString
    const formattedDate = adjustedDate.toLocaleDateString('en-CA'); // Using ISO format (YYYY-MM-DD)
    
    console.log(formattedDate, "Formatted date"); // Debug log

    // Find the word for the formatted date
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
