import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { generateCoupleCode, connectCouple } from '../../api/couple';
import './CoupleConnect.css';

const CoupleConnect: React.FC = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<'choose' | 'share' | 'enter'>('choose');
    const [inviteCode, setInviteCode] = useState<string>('');
    const [enteredCode, setEnteredCode] = useState('');
    const [connecting, setConnecting] = useState(false);
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch code when entering share mode
    useEffect(() => {
        if (mode === 'share' && !inviteCode) {
            const fetchCode = async () => {
                try {
                    const data = await generateCoupleCode();
                    setInviteCode(data.code);
                } catch (err: any) {
                    // If 409, it means already connected or code exists? 
                    // Spec says 409: "Already connected". 
                    // If code exists, spec says it might return existing code. 
                    // If 409, we should check if already connected.
                    console.error('Failed to generate code', err);
                    if (err.response?.status === 409) {
                        alert('이미 커플이 연결되어 있습니다.');
                        navigate('/home');
                    } else {
                        setError('코드 생성 실패. 다시 시도해주세요.');
                    }
                }
            };
            fetchCode();
        }
    }, [mode, inviteCode, navigate]);

    const handleConnect = async () => {
        if (!enteredCode.trim()) return;
        setConnecting(true);
        setError(null);
        try {
            await connectCouple(enteredCode);
            setConnected(true);
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        } catch (err: any) {
            console.error('Connection failed', err);
            if (err.response?.status === 400 || err.response?.status === 404) {
                setError('유효하지 않은 코드입니다.');
            } else if (err.response?.status === 409) {
                setError('이미 커플이 연결되어 있습니다.');
            } else {
                setError('연결 실패. 다시 시도해주세요.');
            }
            setConnecting(false);
        }
    };

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(inviteCode);
            alert('초대 코드가 복사되었습니다!');
        } catch (err) {
            console.error('Copy failed', err);
        }
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
                    <h1 className="connect-title">Connect</h1>
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
                                {inviteCode ? (
                                    <span className="code-text">{inviteCode}</span>
                                ) : (
                                    <span className="code-loading">생성 중...</span>
                                )}
                            </div>
                            {error && <p className="error-message">{error}</p>}
                            <Button variant="secondary" fullWidth onClick={handleCopyCode} disabled={!inviteCode}>
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
                            placeholder="6자리 코드 입력"
                            value={enteredCode}
                            onChange={(e) => setEnteredCode(e.target.value.toUpperCase())}
                            maxLength={8}
                        />
                        {error && <p className="error-text" style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '0.5rem' }}>{error}</p>}

                        <Button
                            variant="gradient"
                            size="large"
                            fullWidth
                            onClick={handleConnect}
                            loading={connecting}
                            disabled={enteredCode.length < 4}
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
