import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/BottomNav';
import { getMe, User } from '../../api/auth';
import { getPartnerInfo } from '../../api/couple';
import { getTodayQuestion, Question } from '../../api/question';
import { getTodayMission, Mission } from '../../api/mission';
import { getAnniversaries } from '../../api/anniversary';
import './Home.css';

const Home: React.FC = () => {
    const navigate = useNavigate();

    // State
    const [user, setUser] = useState<User | null>(null);
    const [partnerName, setPartnerName] = useState<string>('짝꿍');
    const [daysTogether, setDaysTogether] = useState<number>(4);
    const [todayQuestion, setTodayQuestion] = useState<Question | null>(null);
    const [todayMission, setTodayMission] = useState<Mission | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Parallel fetching
                const [userData, partnerData, questionData, missionData, anniversariesData] = await Promise.allSettled([
                    getMe(),
                    getPartnerInfo(),
                    getTodayQuestion(),
                    getTodayMission(),
                    getAnniversaries()
                ]);

                // Handle User
                if (userData.status === 'fulfilled' && userData.value) {
                    setUser(userData.value);
                }

                // Handle Partner
                if (partnerData.status === 'fulfilled' && partnerData.value) {
                    setPartnerName(partnerData.value.name);
                }

                // Handle Question
                if (questionData.status === 'fulfilled') {
                    setTodayQuestion(questionData.value);
                }

                // Handle Mission
                if (missionData.status === 'fulfilled' && missionData.value) {
                    setTodayMission(missionData.value.mission);
                }

                // Handle Anniversaries (to find D-Day)
                if (anniversariesData.status === 'fulfilled' && Array.isArray(anniversariesData.value)) {
                    const startAnniversary = anniversariesData.value.find(a => a.title && (a.title.includes('4일') || a.title.includes('시작')));
                    if (startAnniversary) {
                        const startDate = new Date(startAnniversary.date);
                        const today = new Date();
                        const diffTime = Math.abs(today.getTime() - startDate.getTime());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        setDaysTogether(diffDays);
                    }
                }

            } catch (error) {
                console.error('Error fetching home data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleQuestionClick = () => {
        if (todayQuestion) {
            navigate(`/question/${todayQuestion.questionId}`);
        }
    };

    const handleMissionClick = () => {
        navigate('/mission');
    };

    if (loading) return <div className="page-container center-content">Loading...</div>;

    return (
        <div className="home-page page-container">
            <div className="home-header">
                <div className="couple-profiles">
                    <div className="profile-group">
                        <div className="profile-avatar">{user?.name?.[0] || 'Me'}</div>
                        <div className="profile-name-label">{user?.name || '나'}</div>
                    </div>
                    <div className="dday-counter">
                        <span className="dday-label">D+{daysTogether}</span>
                        <div className="heart-icon">❤️</div>
                    </div>
                    <div className="profile-group">
                        <div className="profile-avatar partner-avatar">{user?.connected ? (partnerName[0]) : '?'}</div>
                        <div className="profile-name-label">{user?.connected ? partnerName : '짝꿍'}</div>
                    </div>
                </div>
                {!user?.connected && (
                    <div className="connect-alert" onClick={() => navigate('/couple-connect')}>
                        커플 연결이 필요해요!
                    </div>
                )}
            </div>

            {/* Pet Section - 60% */}
            <div className="pet-section">
                <div className="floating-dog">🐶</div>
            </div>

            <div className="home-content">
                {/* Today Question */}
                <div className="today-question-section">
                    <div className="section-header">
                        <h2>오늘의 질문</h2>
                        <span className="question-category">{todayQuestion?.category || 'Daily'}</span>
                    </div>

                    {todayQuestion ? (
                        <div className="question-card" onClick={handleQuestionClick}>
                            <p className="question-text">{todayQuestion.question}</p>
                            <div className="answer-status">
                                <div className={`status-badge ${todayQuestion.answered ? 'completed' : 'pending'}`}>
                                    <span className="badge-icon">{todayQuestion.answered ? '✓' : '◯'}</span>
                                    <span className="badge-text">{user?.name || '나'}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="no-question-card">
                            <p>오늘의 질문이 준비되지 않았습니다.</p>
                        </div>
                    )}
                </div>

                {/* Mission Summary / Widget */}
                <div className="mission-widget-section" onClick={handleMissionClick}>
                    <div className="section-header">
                        <h2>오늘의 미션</h2>
                    </div>

                    <div className="mission-card-preview">
                        {todayMission ? (
                            <>
                                <div className="mission-preview-title">{todayMission.title}</div>
                                <div className={`mission-status-badge ${todayMission.performed ? 'done' : 'pending'}`}>
                                    {todayMission.performed ? '✅' : '도전 👉'}
                                </div>
                            </>
                        ) : (
                            <p className="no-mission-text">오늘의 미션이 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>

            <BottomNav />
        </div>
    );
};

export default Home;
