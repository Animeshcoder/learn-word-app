import React, { useState, useEffect, useRef } from 'react';
import Heading from './components/Heading';
import WordDescription from './components/WordDescription';
import CustomCalendar from './components/Calendar';
import Quiz from './components/Quiz';
import LockScreeniPad from './components/Screen';
import './App.css';

function App() {
  const [showMainContent, setShowMainContent] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isPopupVisible, setIsPopupVisible] = useState(true); // Initially visible
  const hasRunEffect = useRef(false); // Track if effect has already run

  useEffect(() => {
    if (hasRunEffect.current) return; // Prevent running effect again
    hasRunEffect.current = true;

    const lastShownDate = localStorage.getItem('lastShownDate');
    let nextDate;

    if (lastShownDate) {
      nextDate = new Date(lastShownDate);
      nextDate.setDate(nextDate.getDate() + 1); // Increment by one day
    } else {
      nextDate = new Date();
      nextDate.setDate(1); // Set it to the 1st of the current month or desired month
    }

    console.log('Setting nextDate:', nextDate);
    setSelectedDate(nextDate);
    localStorage.setItem('lastShownDate', nextDate.toLocaleDateString('en-CA')); // Store in YYYY-MM-DD format
  }, []);

  const handleLearnMore = () => {
    setShowMainContent(true);
  };

  const handleDateChange = (date) => {
    console.log("Selected date changed to:", date);
    setSelectedDate(date);
  };

  const handleGoBack = () => {
    setShowMainContent(false);
    setIsPopupVisible(false); // Hide the popup
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  // New reset function to clear local storage and reload the page
  const handleReset = () => {
    localStorage.removeItem('lastShownWordDate');
    localStorage.removeItem('lastShownDate');
    localStorage.removeItem('submissions');
    alert('Data has been reset.');
    window.location.reload(); // Reloads the page
  };

  return (
    <div className="outer-container">
      {showMainContent ? (
        <div className="main-container">
          <Heading />
          <WordDescription selectedDate={selectedDate} />
          <div className="content">
            <CustomCalendar onDateChange={handleDateChange} />
            <Quiz selectedDate={selectedDate} />
          </div>
          <div className="button-row">
            <button onClick={handleGoBack}>Go Back</button>
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
      ) : (
        <LockScreeniPad onLearnMore={handleLearnMore} isPopupVisible={isPopupVisible} onClosePopup={handleClosePopup} />
      )}
    </div>
  );
}

export default App;
