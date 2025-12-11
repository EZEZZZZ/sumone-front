import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/BottomNav';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { getTodayMission, completeMission, getMissionHistory, Mission, MissionHistoryItem } from '../../api/mission';
import './Mission.css';

const MissionPage: React.FC = () => {
    const navigate = useNavigate();
    const [todayMission, setTodayMission] = useState<Mission | null>(null);
    const [history, setHistory] = useState<MissionHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [evidence, setEvidence] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [todayData, historyData] = await Promise.all([
                getTodayMission(),
                getMissionHistory(0, 20)
            ]);
            console.log('Today Mission Data:', todayData);
            console.log('Mission History Data:', historyData);

            setTodayMission(todayData.mission);
            // historyData is { missions: [], ... }
            setHistory(historyData && Array.isArray(historyData.missions) ? historyData.missions : []);
        } catch (error) {
            console.error('Failed to fetch mission data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async () => {
        if (!evidence.trim()) return;
        setSubmitting(true);
        try {
            await completeMission(evidence);
            alert('미션을 완료했습니다! 🎉');

            // Force reload to ensure data is fresh and UI updates cleanly
            window.location.reload();

        } catch (error) {
            alert('미션 완료 처리에 실패했습니다.');
            setSubmitting(false);
        }
    };

    if (loading) return <div className="page-container center-content">Loading...</div>;

    return (
        <div className="mission-page page-container">
            <div className="mission-header">
                <h1>오늘의 미션</h1>
                <p className="mission-subtitle">매일매일 새로운 추억 만들기</p>
            </div>

            <div className="mission-content">
                {todayMission ? (
                    <div className="today-mission-card">
                        <div className="mission-badge">{todayMission.type === 'ACTION' ? '🔥 행동 미션' : '💭 질문 미션'}</div>
                        <h2 className="mission-title">{todayMission.title}</h2>

                        {todayMission.performed ? (
                            <div className="mission-completed-state">
                                <div className="check-icon">✅</div>
                                <p>오늘의 미션을 완료했어요</p>
                            </div>
                        ) : (
                            <div className="mission-action-area">
                                <Input
                                    multiline
                                    placeholder="미션 수행 인증 글을 남겨주세요..."
                                    value={evidence}
                                    onChange={(e) => setEvidence(e.target.value)}
                                />
                                <div className="submit-btn-wrapper">
                                    <Button
                                        variant="gradient"
                                        fullWidth
                                        onClick={handleComplete}
                                        disabled={submitting || !evidence.trim()}
                                    >
                                        미션 완료하기
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="no-mission-card">
                        <p>오늘의 미션이 없습니다.</p>
                    </div>
                )}

                <div className="mission-history-section">
                    <h3>지난 미션 기록</h3>
                    <div className="history-list">
                        {history.length > 0 ? (
                            history.map((item) => (
                                <div
                                    key={item.missionId}
                                    className={`history-item ${item.performed ? 'done' : 'missed'}`}
                                    onClick={() => navigate(`/mission/${item.missionId}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="history-info">
                                        <span className="history-title">{item.title}</span>
                                        <span className="history-date">{item.date.split('-').slice(1).join('/')}</span>
                                        <span className="history-status">
                                            {item.performed && item.partnerPerformed ? '성공' : '진행중'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="empty-history">아직 기록이 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>

            <BottomNav />
        </div>
    );
};

export default MissionPage;
