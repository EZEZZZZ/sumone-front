import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import './CoupleConnect.css';

const CoupleConnect: React.FC = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<'choose' | 'share' | 'enter'>('choose');
    const [inviteCode] = useState('LOVE2024');
    const [enteredCode, setEnteredCode] = useState('');
    const [connecting, setConnecting] = useState(false);
    const [connected, setConnected] = useState(false);

    const handleConnect = () => {
        setConnecting(true);
        // Mock connection
        setTimeout(() => {
            setConnecting(false);
            setConnected(true);
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        }, 1500);
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(inviteCode);
        alert('초대 코드가 복사되었습니다!');
    };

    if (connected) {
        return (
            <div className="couple-connect-page page-container">
                <div className="connect-success">
                    <div className="success-animation">
                        <div className="heart-icon">💕</div>
                    </div>
                    <h2 className="success-title gradient-text">연결되었습니다!</h2>
                    <p className="success-message">이제 함께 추억을 쌓아가요</p>
                </div>
            </div>
        );
    }

    return (
        <div className="couple-connect-page page-container">
            <div className="connect-content">
                <div className="connect-header">
                    <h1 className="connect-title">연인과 연결하기</h1>
                    <p className="connect-description">
                        초대 코드를 공유하거나 받은 코드를 입력하세요
                    </p>
                </div>

                {mode === 'choose' && (
                    <div className="connect-options">
                        <button
                            className="connect-option-card"
                            onClick={() => setMode('share')}
                        >
                            <div className="option-icon">📤</div>
                            <h3>초대 코드 공유하기</h3>
                            <p>내 코드를 연인에게 전달</p>
                        </button>

                        <button
                            className="connect-option-card"
                            onClick={() => setMode('enter')}
                        >
                            <div className="option-icon">📥</div>
                            <h3>코드 입력하기</h3>
                            <p>연인에게 받은 코드 입력</p>
                        </button>
                    </div>
                )}

                {mode === 'share' && (
                    <div className="connect-mode">
                        <div className="code-display">
                            <p className="code-label">내 초대 코드</p>
                            <div className="code-box">
                                <span className="code-text">{inviteCode}</span>
                            </div>
                            <Button variant="secondary" fullWidth onClick={handleCopyCode}>
                                코드 복사하기
                            </Button>
                        </div>

                        <div className="share-instructions">
                            <p>💡 연인에게 이 코드를 전달하세요</p>
                            <p>상대방이 코드를 입력하면 자동으로 연결됩니다</p>
                        </div>

                        <Button variant="ghost" fullWidth onClick={() => setMode('choose')}>
                            뒤로 가기
                        </Button>
                    </div>
                )}

                {mode === 'enter' && (
                    <div className="connect-mode">
                        <Input
                            label="초대 코드"
                            placeholder="XXXXXXXX"
                            value={enteredCode}
                            onChange={(e) => setEnteredCode(e.target.value)}
                            maxLength={8}
                        />

                        <Button
                            variant="gradient"
                            size="large"
                            fullWidth
                            onClick={handleConnect}
                            loading={connecting}
                            disabled={enteredCode.length < 8}
                        >
                            연결하기
                        </Button>

                        <Button variant="ghost" fullWidth onClick={() => setMode('choose')}>
                            뒤로 가기
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoupleConnect;
