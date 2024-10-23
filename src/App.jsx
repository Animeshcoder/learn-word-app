import React, { useState, useEffect } from 'react';
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

  const handleLearnMore = () => {
    setShowMainContent(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleGoBack = () => {
    setShowMainContent(false);
    setIsPopupVisible(false); // Hide the popup
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
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
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      ) : (
        <LockScreeniPad onLearnMore={handleLearnMore} isPopupVisible={isPopupVisible} onClosePopup={handleClosePopup} />
      )}
    </div>
  );
}

export default App;
