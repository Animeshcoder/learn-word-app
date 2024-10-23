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
      const dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
      const submission = submissions.find(sub => sub.date === dateString);
      if (submission) {
        return submission.correct ? 'submitted-correct' : 'submitted-incorrect';
      }
    }
    return null;
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
