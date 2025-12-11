import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMissionDetail, Mission } from '../../api/mission';
import BottomNav from '../../components/BottomNav/BottomNav';
import Button from '../../components/common/Button';
import './MissionDetail.css';

const MissionDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [mission, setMission] = useState<Mission | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchDetail = async () => {
            try {
                const data = await getMissionDetail(Number(id));
                setMission(data);
            } catch (error) {
                console.error('Failed to fetch mission detail', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [id]);

    if (loading) return <div className="page-container center-content">Loading...</div>;
    if (!mission) return <div className="page-container center-content">Mission not found</div>;

    const isMeDone = mission.performed;
    const isPartnerDone = mission.partnerPerformed || false; // Mock data field
    const isBothDone = isMeDone && isPartnerDone;

    return (
        <div className="mission-detail-page page-container">
            <div className="detail-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    ← 뒤로
                </button>
                <h1>Mission Detail</h1>
            </div>

            <div className="detail-content">
                <div className={`mission-title-card ${isBothDone ? 'clear-glow' : ''}`}>
                    <div className="mission-type">{mission.type === 'ACTION' ? '🔥 행동 미션' : '💭 질문 미션'}</div>
                    <h2>{mission.title}</h2>
                    <p className="mission-date">{mission.date}</p>
                </div>

                <div className="status-container">
                    <div className={`status-box ${isMeDone ? 'done' : ''}`}>
                        <div className="avatar">나</div>
                        <div className="mark">{isMeDone ? '⭕️' : '❌'}</div>
                        <div className="label">{isMeDone ? '완료' : '미완료'}</div>
                    </div>

                    <div className="vs-divider">
                        {isBothDone ? '💖' : '⚡️'}
                    </div>

                    <div className={`status-box ${isPartnerDone ? 'done' : ''}`}>
                        <div className="avatar">짝꿍</div>
                        <div className="mark">{isPartnerDone ? '⭕️' : '❌'}</div>
                        <div className="label">{isPartnerDone ? '완료' : '미완료'}</div>
                    </div>
                </div>

                {isBothDone ? (
                    <div className="clear-celebration">
                        <div className="clear-badge">MISSION CLEAR! 🎉</div>
                        <p>두 분 모두 미션을 완수하셨군요!</p>
                        <p>조약돌 10개를 드려요 💕</p>
                    </div>
                ) : (
                    <div className="pending-notice">
                        <p>아직 두 분 모두 완료하지 않았어요.</p>
                        <p>파이팅! 💪</p>
                    </div>
                )}
            </div>

            <BottomNav />
        </div>
    );
};

export default MissionDetail;
