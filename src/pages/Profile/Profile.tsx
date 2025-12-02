import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/BottomNav';
import { mockCouple } from '../../data/mockUser';
import './Profile.css';

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const { user, partner, anniversaryDate, daysTogetherCount, questionsAnswered } = mockCouple;

    const handleSettings = () => {
        navigate('/settings');
    };

    const handleLogout = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            navigate('/login');
        }
    };

    return (
        <div className="profile-page page-container">
            <div className="profile-header">
                <h1>우리의 프로필</h1>
                <button className="settings-btn" onClick={handleSettings}>
                    ⚙️
                </button>
            </div>

            <div className="profile-content">
                <div className="couple-card">
                    <div className="couple-avatars">
                        <div className="profile-avatar-large">{user.name[0]}</div>
                        <div className="heart-connector">💕</div>
                        <div className="profile-avatar-large">{partner.name[0]}</div>
                    </div>

                    <div className="couple-names">
                        <span>{user.name}</span>
                        <span>&</span>
                        <span>{partner.name}</span>
                    </div>

                    <div className="anniversary-info">
                        <div className="anniversary-date">
                            {anniversaryDate} ~
                        </div>
                        <div className="days-together">
                            함께한 지 <strong>{daysTogetherCount}일</strong>
                        </div>
                    </div>
                </div>

                <div className="stats-section">
                    <h2>우리의 기록</h2>

                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-icon-large">💬</div>
                            <div className="stat-number">{questionsAnswered}</div>
                            <div className="stat-description">나눈 대화</div>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon-large">🎯</div>
                            <div className="stat-number">{Math.round((questionsAnswered / daysTogetherCount) * 100)}%</div>
                            <div className="stat-description">응답률</div>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon-large">🏆</div>
                            <div className="stat-number">12</div>
                            <div className="stat-description">연속 기록</div>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon-large">⭐</div>
                            <div className="stat-number">350</div>
                            <div className="stat-description">조약돌</div>
                        </div>
                    </div>
                </div>

                <div className="important-dates-section">
                    <h2>기념일</h2>

                    <div className="dates-list">
                        <div className="date-item">
                            <div className="date-icon">💑</div>
                            <div className="date-info">
                                <div className="date-title">우리의 시작</div>
                                <div className="date-value">{anniversaryDate}</div>
                            </div>
                        </div>

                        <div className="date-item">
                            <div className="date-icon">🎂</div>
                            <div className="date-info">
                                <div className="date-title">{user.name} 생일</div>
                                <div className="date-value">{user.birthday}</div>
                            </div>
                        </div>

                        <div className="date-item">
                            <div className="date-icon">🎂</div>
                            <div className="date-info">
                                <div className="date-title">{partner.name} 생일</div>
                                <div className="date-value">{partner.birthday}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile-actions">
                    <button className="action-btn premium-btn">
                        <span className="btn-icon">👑</span>
                        <span>프리미엄 업그레이드</span>
                    </button>

                    <button className="action-btn logout-btn" onClick={handleLogout}>
                        <span>로그아웃</span>
                    </button>
                </div>
            </div>

            <BottomNav />
        </div>
    );
};

export default Profile;
