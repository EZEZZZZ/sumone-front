import React from 'react';
import BottomNav from '../../components/BottomNav/BottomNav';
import BanyeomongAvatar from '../../components/Banyeomong/BanyeomongAvatar';
import { mockCouple } from '../../data/mockUser';
import './BanyeomongCare.css';

const BanyeomongCare: React.FC = () => {
    const { banyeomong } = mockCouple;

    const decorations = [
        { id: 1, name: '소파', icon: '🛋️', price: 50 },
        { id: 2, name: '화분', icon: '🪴', price: 30 },
        { id: 3, name: '그림', icon: '🖼️', price: 40 },
        { id: 4, name: '별 조명', icon: '⭐', price: 60 },
        { id: 5, name: '러그', icon: '🧶', price: 35 },
        { id: 6, name: '책장', icon: '📚', price: 70 },
    ];

    return (
        <div className="banyeomong-care-page page-container">
            <div className="care-header">
                <h1>Banyeomong Care</h1>
            </div>

            <div className="care-content">
                <div className="banyeomong-showcase">
                    <BanyeomongAvatar species={banyeomong.species} size="large" animate />

                    <div className="banyeomong-info">
                        <div className="info-row">
                            <span className="info-label">종류</span>
                            <span className="info-value">{banyeomong.species}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">레벨</span>
                            <span className="info-value">Lv. {banyeomong.level}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">행복도</span>
                            <div className="happiness-bar">
                                <div
                                    className="happiness-fill"
                                    style={{ width: `${banyeomong.happiness}%` }}
                                />
                            </div>
                            <span className="info-value">{banyeomong.happiness}%</span>
                        </div>
                    </div>
                </div>

                <div className="care-actions">
                    <button className="care-action-btn">
                        <span className="action-icon">🍖</span>
                        <span className="action-label">먹이 주기</span>
                    </button>
                    <button className="care-action-btn">
                        <span className="action-icon">🎮</span>
                        <span className="action-label">놀아 주기</span>
                    </button>
                    <button className="care-action-btn">
                        <span className="action-icon">💤</span>
                        <span className="action-label">재우기</span>
                    </button>
                </div>

                <div className="decoration-shop">
                    <div className="shop-header">
                        <h2>방 꾸미기</h2>
                        <div className="currency-display">
                            <span className="currency-icon">🪨</span>
                            <span className="currency-amount">350 조약돌</span>
                        </div>
                    </div>

                    <div className="decoration-grid">
                        {decorations.map((item) => (
                            <div key={item.id} className="decoration-item">
                                <div className="decoration-icon">{item.icon}</div>
                                <div className="decoration-name">{item.name}</div>
                                <div className="decoration-price">
                                    <span className="price-icon">🪨</span>
                                    <span>{item.price}</span>
                                </div>
                                <button className="decoration-buy-btn">구매</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <BottomNav />
        </div>
    );
};

export default BanyeomongCare;
