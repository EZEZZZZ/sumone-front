import React from 'react';
import { useNavigate } from 'react-router-dom';
import BanyeomongAvatar from '../../components/Banyeomong/BanyeomongAvatar';
import BottomNav from '../../components/BottomNav/BottomNav';
import { mockCouple } from '../../data/mockUser';
import { getTodayQuestion } from '../../data/mockQuestions';
import './Home.css';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const todayQuestion = getTodayQuestion();
    const { user, partner, daysTogetherCount, banyeomong } = mockCouple;

    const handleQuestionClick = () => {
        navigate(`/question/${todayQuestion.id}`);
    };

    const handlePokePartner = () => {
        alert(`${partner.name}님에게 콕 찌르기를 보냈어요! 👉`);
    };

    return (
        <div className="home-page page-container">
            <div className="home-header">
                <div className="couple-profiles">
                    <div className="profile-avatar">{user.name[0]}</div>
                    <div className="dday-counter">
                        <span className="dday-label">D+{daysTogetherCount}</span>
                    </div>
                    <div className="profile-avatar">{partner.name[0]}</div>
                </div>
            </div>

            <div className="home-content">
                <div className="banyeomong-section">
                    <div className="room-container">
                        <div className="room-decoration floor">
                            <div className="rug"></div>
                        </div>

                        <div className="banyeomong-wrapper">
                            <BanyeomongAvatar
                                species={banyeomong.species}
                                size="large"
                                animate
                            />
                            <p className="banyeomong-name">{banyeomong.name}</p>
                            <div className="banyeomong-stats">
                                <div className="stat-bar">
                                    <span className="stat-label">행복도</span>
                                    <div className="stat-progress">
                                        <div
                                            className="stat-fill"
                                            style={{ width: `${banyeomong.happiness}%` }}
                                        ></div>
                                    </div>
                                    <span className="stat-value">{banyeomong.happiness}%</span>
                                </div>
                            </div>
                        </div>

                        <div className="room-decoration furniture">
                            <div className="plant">🪴</div>
                            <div className="lamp">💡</div>
                        </div>
                    </div>
                </div>

                <div className="today-question-section">
                    <div className="section-header">
                        <h2>오늘의 질문</h2>
                        <span className="question-category">{todayQuestion.category}</span>
                    </div>

                    <div className="question-card" onClick={handleQuestionClick}>
                        <p className="question-text">{todayQuestion.question}</p>

                        <div className="answer-status">
                            <div className={`status-badge ${todayQuestion.answeredByUser ? 'completed' : 'pending'}`}>
                                <span className="badge-icon">{todayQuestion.answeredByUser ? '✓' : '◯'}</span>
                                <span className="badge-text">{user.name}</span>
                            </div>

                            <div className={`status-badge ${todayQuestion.answeredByPartner ? 'completed' : 'pending'}`}>
                                <span className="badge-icon">{todayQuestion.answeredByPartner ? '✓' : '◯'}</span>
                                <span className="badge-text">{partner.name}</span>
                            </div>
                        </div>

                        {!todayQuestion.answeredByPartner && todayQuestion.answeredByUser && (
                            <button className="poke-button" onClick={(e) => {
                                e.stopPropagation();
                                handlePokePartner();
                            }}>
                                👉 콕 찌르기
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <BottomNav />
        </div>
    );
};

export default Home;
