import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/BottomNav';
import { getAnsweredQuestions } from '../../data/mockQuestions';
import './History.css';

const History: React.FC = () => {
    const navigate = useNavigate();
    const answeredQuestions = getAnsweredQuestions();
    const [viewMode, setViewMode] = useState<'timeline' | 'calendar'>('timeline');

    const handleQuestionClick = (id: string) => {
        navigate(`/question/${id}`);
    };

    return (
        <div className="history-page page-container">
            <div className="history-header">
                <h1>우리의 추억</h1>
                <div className="view-toggle">
                    <button
                        className={`toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`}
                        onClick={() => setViewMode('timeline')}
                    >
                        📜 타임라인
                    </button>
                    <button
                        className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                        onClick={() => setViewMode('calendar')}
                    >
                        📅 달력
                    </button>
                </div>
            </div>

            <div className="history-stats">
                <div className="stat-card">
                    <div className="stat-icon">💕</div>
                    <div className="stat-info">
                        <div className="stat-value">{answeredQuestions.length}</div>
                        <div className="stat-label">함께 나눈 이야기</div>
                    </div>
                </div>
            </div>

            <div className="history-content">
                {viewMode === 'timeline' ? (
                    <div className="timeline-view">
                        {answeredQuestions.map((question, index) => (
                            <div
                                key={question.id}
                                className="timeline-item"
                                onClick={() => handleQuestionClick(question.id)}
                            >
                                <div className="timeline-marker">
                                    <div className="marker-dot"></div>
                                    {index < answeredQuestions.length - 1 && (
                                        <div className="marker-line"></div>
                                    )}
                                </div>

                                <div className="timeline-content">
                                    <div className="timeline-date">{question.date}</div>
                                    <div className="timeline-card">
                                        <div className="card-category">{question.category}</div>
                                        <h3 className="card-question">{question.question}</h3>
                                        <div className="card-preview">
                                            <div className="preview-answer">
                                                <span className="preview-label">나:</span>
                                                <span className="preview-text">{question.userAnswer}</span>
                                            </div>
                                            <div className="preview-answer">
                                                <span className="preview-label">상대:</span>
                                                <span className="preview-text">{question.partnerAnswer}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="calendar-view">
                        <div className="calendar-placeholder">
                            <span className="calendar-icon">📅</span>
                            <p>달력 뷰는 곧 출시됩니다!</p>
                        </div>
                    </div>
                )}
            </div>

            <BottomNav />
        </div>
    );
};

export default History;
