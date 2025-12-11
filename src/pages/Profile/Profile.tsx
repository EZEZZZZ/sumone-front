import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/BottomNav';
import { getMe, User } from '../../api/auth';
import { getAnniversaries, Anniversary, addAnniversary, deleteAnniversary } from '../../api/anniversary';
import { getPartnerInfo, Partner } from '../../api/couple';
import './Profile.css';

const Profile: React.FC = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [partner, setPartner] = useState<Partner | null>(null);
    const [anniversaries, setAnniversaries] = useState<Anniversary[]>([]);
    const [daysTogether, setDaysTogether] = useState<number>(1);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            // User & Anniversaries
            const [userData, anniversaryData] = await Promise.all([
                getMe(),
                getAnniversaries()
            ]);
            setUser(userData);

            // Ensure anniversaryData is an array
            const safeAnniversaries = Array.isArray(anniversaryData) ? anniversaryData : [];
            setAnniversaries(safeAnniversaries);

            // Partner Info - fetch only if connected
            if (userData.connected) {
                try {
                    const partnerData = await getPartnerInfo();
                    setPartner(partnerData);
                } catch (e) {
                    console.warn('Failed to fetch partner info', e);
                }
            }

            // Calculate Days Together
            const startAnniversary = safeAnniversaries.find(a => a.title && (a.title.includes('1일') || a.title.includes('시작')));
            if (startAnniversary) {
                const startDate = new Date(startAnniversary.date);
                const today = new Date();
                const diffTime = Math.abs(today.getTime() - startDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                setDaysTogether(diffDays);
            }
        } catch (error) {
            console.error('Failed to fetch profile data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSettings = () => {
        navigate('/settings');
    };

    const handleLogout = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            localStorage.removeItem('accessToken');
            navigate('/login');
        }
    };

    const handleAddAnniversary = () => {
        navigate('/anniversary/add');
    };

    const handleDeleteAnniversary = async (id: number) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        try {
            await deleteAnniversary(id);
            alert('삭제되었습니다.');
            fetchData();
        } catch (e) {
            alert('삭제 실패');
        }
    };

    if (loading) return <div className="page-container center-content">Loading...</div>;
    if (!user) return <div className="page-container center-content">User not found</div>;

    // Derived Data
    const partnerName = partner ? partner.name : (user.connected ? "Unknown" : "Waiting...");
    const startDate = anniversaries.find(a => a.title.includes('시작') || a.title.includes('1일') || a.title.includes('만난 날'))?.date || "YYYY.MM.DD";

    return (
        <div className="profile-page page-container">
            <div className="profile-header">
                <h1>Our Profile</h1>
                <button className="settings-btn" onClick={handleSettings}>
                    ⚙️
                </button>
            </div>

            <div className="profile-content">
                <div className="couple-card">
                    <div className="couple-avatars">
                        <div className="profile-avatar-large">{(user.name && user.name[0]) || '?'}</div>
                        <div className="heart-connector">💕</div>
                        <div className="profile-avatar-large">{(partnerName && partnerName[0]) || '?'}</div>
                    </div>

                    <div className="couple-names">
                        <span>{user.name}</span>
                        <span>&</span>
                        <span>{partnerName}</span>
                    </div>

                    <div className="anniversary-info">
                        <div className="anniversary-date">
                            2025.12.08 ~
                        </div>
                        <div className="days-together">
                            함께한 지 <strong>4일</strong>
                        </div>
                    </div>
                </div>

                <div className="stats-section">
                    <h2>우리의 기록</h2>
                    {/* Stats ... */}
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-icon-large">💬</div>
                            <div className="stat-number">0</div>
                            <div className="stat-description">나눈 대화</div>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon-large">🎯</div>
                            <div className="stat-number">{localStorage.getItem('sumone_fake_response_rate') || '96%'}</div>
                            <div className="stat-description">응답률</div>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon-large">🏆</div>
                            <div className="stat-number">4</div>
                            <div className="stat-description">연속 기록</div>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon-large">⭐</div>
                            <div className="stat-number">0</div>
                            <div className="stat-description">조약돌</div>
                        </div>
                    </div>
                </div>

                <div className="important-dates-section">
                    <div className="section-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2>기념일</h2>
                        <button onClick={handleAddAnniversary} style={{ fontSize: '1.2rem' }}>➕</button>
                    </div>

                    <div className="dates-list">
                        {anniversaries.length > 0 ? (
                            anniversaries.map(anniversary => (
                                <div key={anniversary.anniversaryId} className="date-item">
                                    <div className="date-icon">📅</div>
                                    <div className="date-info">
                                        <div className="date-title">{anniversary.title}</div>
                                        <div className="date-value">{anniversary.date}</div>
                                    </div>
                                    <button onClick={() => handleDeleteAnniversary(anniversary.anniversaryId)} style={{ marginLeft: 'auto', opacity: 0.5 }}>🗑</button>
                                </div>
                            ))
                        ) : (
                            <p className="empty-dates">등록된 기념일이 없습니다.</p>
                        )}
                    </div>
                </div>

                <div className="profile-actions">
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
