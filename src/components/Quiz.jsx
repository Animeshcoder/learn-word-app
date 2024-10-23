import React, { useState, useEffect } from 'react';
import questions from '../questions.json';
import './Quiz.css';

const Quiz = ({ selectedDate }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const adjustedDate = new Date(selectedDate);
    adjustedDate.setDate(selectedDate.getDate() + 1); // Increment date by one
    const formattedDate = adjustedDate.toISOString().split('T')[0];
    console.log(formattedDate, "date"); // Debug log
    const questionForDate = questions.find(q => q.date === formattedDate);
    setCurrentQuestion(questionForDate);

    const savedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];
    setSubmissions(savedSubmissions);
  }, [selectedDate]);

  const handleOptionChange = (index) => {
    setSelectedOption(index);
    const correct = index === currentQuestion.correctOption;
    setIsCorrect(correct);
    setCorrectOption(currentQuestion.correctOption);

    const updatedSubmissions = [...submissions];
    const adjustedDate = new Date(selectedDate);
    adjustedDate.setDate(selectedDate.getDate() + 1); // Increment date by one
    const formattedDate = adjustedDate.toISOString().split('T')[0];
    const existingSubmission = updatedSubmissions.find(submission => submission.date === formattedDate);
    if (existingSubmission) {
      existingSubmission.submitted = true;
      existingSubmission.correct = correct;
      existingSubmission.selectedOption = index;
    } else {
      updatedSubmissions.push({
        date: formattedDate,
        submitted: true,
        correct,
        selectedOption: index
      });
    }

    localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
    setSubmissions(updatedSubmissions);
  };

  const adjustedDate = new Date(selectedDate);
  adjustedDate.setDate(selectedDate.getDate() + 1); // Increment date by one
  const formattedDate = adjustedDate.toISOString().split('T')[0];
  const existingSubmission = submissions.find(submission => submission.date === formattedDate);

  if (!currentQuestion) {
    return (
      <div className="quiz-container">
        <p style={{ fontSize: '1.5em', color: '#555', margin: 0, textAlign: 'center' }}>No quiz available for this date!</p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>Quiz</h2>
      <h3>Test your knowledge</h3>
      <p>{currentQuestion.question}</p>
      <ul className="options-list">
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <button
              className={`option-button ${
                selectedOption !== null
                  ? index === correctOption
                    ? 'correct'
                    : selectedOption === index
                    ? 'incorrect'
                    : ''
                  : existingSubmission && existingSubmission.submitted && index === correctOption
                  ? 'correct'
                  : existingSubmission && existingSubmission.submitted && index === existingSubmission.selectedOption
                  ? existingSubmission.correct
                    ? 'correct'
                    : 'incorrect'
                  : ''
              }`}
              onClick={() => handleOptionChange(index)}
              disabled={selectedOption !== null || (existingSubmission && existingSubmission.submitted)}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quiz;
