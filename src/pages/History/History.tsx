import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/BottomNav';
import { mockQuestions } from '../../data/mockQuestions';
import './History.css';

const History: React.FC = () => {
    const navigate = useNavigate();
    // Show all questions in reverse order (newest first)
    const allQuestions = [...mockQuestions].reverse();

    const handleQuestionClick = (id: string) => {
        navigate(`/question/${id}`);
    };

    return (
        <div className="history-page page-container">
            <div className="history-header">
                <h1>List</h1>
                <button className="bookmark-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </button>
            </div>

            <div className="question-list">
                {allQuestions.map((question, index) => (
                    <div
                        key={question.id}
                        className="question-list-item"
                        onClick={() => handleQuestionClick(question.id)}
                    >
                        <span className="question-number">
                            #{String(allQuestions.length - index).padStart(2, '0')}
                        </span>
                        <span className="question-text">{question.question}</span>
                    </div>
                ))}
            </div>

            <BottomNav />
        </div>
    );
};

export default History;
