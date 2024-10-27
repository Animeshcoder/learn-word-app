import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const CustomCalendar = ({ onDateChange }) => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const savedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];
    setSubmissions(savedSubmissions);
  }, []);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      // Create a new Date object and set time to midnight
      const adjustedDate = new Date(date);
      adjustedDate.setHours(0, 0, 0, 0); // Set to midnight to avoid time issues
  
      // Format the date to YYYY-MM-DD using toLocaleDateString
      const dateString = adjustedDate.toLocaleDateString('en-CA');
  
      // Find the corresponding submission for the date
      const submission = submissions.find(submission => submission.date === dateString);
  
      // Log submissions for debugging
      console.log(submissions);
  
      // Return the appropriate class name based on submission correctness
      return submission ? (submission.correct ? 'submitted-correct' : 'submitted-incorrect') : null;
    }
    return null; // Return null if not in month view
  };
  
  return (
    <div className="calendar-container">
      <h2>Check Your Progress</h2>
      <Calendar
        className="custom-calendar"
        tileClassName={tileClassName}
        onClickDay={onDateChange}
      />
    </div>
  );
};

export default CustomCalendar;
