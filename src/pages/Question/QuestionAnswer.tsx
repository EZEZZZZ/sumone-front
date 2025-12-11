import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { getQuestionDetail, answerQuestion } from '../../api/question';
import { getMe } from '../../api/auth';
import { getPartnerInfo } from '../../api/couple';
import './QuestionAnswer.css';

// Emotion options
const EMOTIONS = [
    { key: 'happy', emoji: '😊', label: '행복해요' },
    { key: 'sad', emoji: '😢', label: '슬퍼요' },
    { key: 'angry', emoji: '😠', label: '화나요' },
    { key: 'tired', emoji: '😴', label: '피곤해요' },
    { key: 'love', emoji: '🥰', label: '사랑해요' },
    { key: 'peace', emoji: '😌', label: '평온해요' },
    { key: 'excited', emoji: '😆', label: '신나요' },
    { key: 'gloom', emoji: '😔', label: '우울해요' },
];

const QuestionAnswer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Data States
    const [loading, setLoading] = useState(true);
    const [questionId, setQuestionId] = useState<number>(Number(id) || 0);
    const [questionDate, setQuestionDate] = useState('2025.12.11');
    const [questionTitle, setQuestionTitle] = useState('가장 좋아하는 계절은?');
    const [questionCategory, setQuestionCategory] = useState('취향');

    const [userName, setUserName] = useState('이땡떙');

    // Answer States
    const [myAnswer, setMyAnswer] = useState('난 다 좋다');
    const [isMyAnswerSubmitted, setIsMyAnswerSubmitted] = useState(true);

    const [partnerName, setPartnerName] = useState('김땡떙');
    const [partnerAnswer, setPartnerAnswer] = useState('안녕하세요 스프링 입니다.');
    const [isPartnerAnswerSubmitted, setIsPartnerAnswerSubmitted] = useState(true);

    const [showPartnerAnswer, setShowPartnerAnswer] = useState(false);
    const [selectedEmotion, setSelectedEmotion] = useState<number | null>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch from LocalStorage API
                const [qData, uData, pData] = await Promise.all([
                    getQuestionDetail(Number(id)),
                    getMe(),
                    getPartnerInfo()
                ]);

                if (qData) {
                    setQuestionId(qData.questionId);
                    setQuestionTitle(qData.question);
                    setQuestionDate(qData.date);
                    setQuestionCategory(qData.category || 'Daily');

                    // Init "My Answer" from persisted data
                    if (qData.userAnswer) {
                        setMyAnswer(qData.userAnswer);
                        setIsMyAnswerSubmitted(true);
                    } else {
                        // Unanswered -> Show Input
                        setMyAnswer('');
                        setIsMyAnswerSubmitted(false);
                    }

                    // Init Partner Answer
                    if (qData.partnerAnswer) {
                        setPartnerAnswer(qData.partnerAnswer);

                        // Atomically determine submission status to prevent flickering
                        const shouldHideForDemo = uData && uData.name === '이땡땡';
                        setIsPartnerAnswerSubmitted(!shouldHideForDemo);
                    }
                }
                if (uData) {
                    setUserName(uData.name);
                }

                if (pData) {
                    setPartnerName(pData.name);
                }

            } catch (e) {
                console.error("Failed to fetch question detail", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleRevealAnswer = () => {
        setShowPartnerAnswer(true);
    };

    const handleEmotionClick = (index: number) => {
        if (!isMyAnswerSubmitted) {
            setSelectedEmotion(index);
        }
    };

    const handleSubmitMock = async () => {
        setIsMyAnswerSubmitted(true);
        // Persist to LocalStorage
        try {
            await answerQuestion(questionId, myAnswer);
            localStorage.setItem('sumone_fake_response_rate', '100%'); // Fake 100% on answer
            alert('답변이 저장되었습니다.');

            // Special Demo Logic for User 1 (이땡땡)
            if (userName === '이땡땡') {
                setTimeout(() => {
                    setPartnerAnswer('쉽지않음');
                    setIsPartnerAnswerSubmitted(true);
                    alert('상대방의 답변이 도착했습니다!'); // Optional notification
                }, 5000);
            }

        } catch (e) {
            console.error('Failed to save answer', e);
        }
    };

    if (loading) return <div className="page-container center-content">Loading...</div>;

    const bothSubmitted = isMyAnswerSubmitted && isPartnerAnswerSubmitted;

    return (
        <div className="question-answer-page page-container">
            <div className="question-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← 뒤로
                </button>
                <span className="question-date">{questionDate}</span>
            </div>

            <div className="question-content">
                <div className="emotion-selector-section">
                    <h3 className="emotion-title">오늘 나의 기분은?</h3>
                    <div className="emotion-grid">
                        {EMOTIONS.map((emotion, index) => (
                            <button
                                key={index}
                                className={`emotion-button ${selectedEmotion === index ? 'selected' : ''}`}
                                onClick={() => handleEmotionClick(index)}
                                style={{ cursor: isMyAnswerSubmitted ? 'default' : 'pointer' }}
                            >
                                <span className="emotion-emoji">{emotion.emoji}</span>
                                <span className="emotion-label">{emotion.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="question-category-badge">{questionCategory}</div>
                <h1 className="question-title">{questionTitle}</h1>

                <div className="answer-section">
                    <div className="answer-box">
                        <div className="answer-header">
                            <span className="answer-author">{userName}의 답변</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span className="answer-status-text">
                                    {isMyAnswerSubmitted ? '✓ 작성완료' : '작성 중...'}
                                </span>
                                {isMyAnswerSubmitted && (
                                    <button
                                        onClick={() => setIsMyAnswerSubmitted(false)}
                                        style={{
                                            background: 'none',
                                            border: '1px solid #ddd',
                                            borderRadius: '12px',
                                            padding: '2px 8px',
                                            fontSize: '0.8rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        수정
                                    </button>
                                )}
                            </div>
                        </div>

                        {isMyAnswerSubmitted ? (
                            <div className="answer-display">
                                <p>{myAnswer}</p>
                            </div>
                        ) : (
                            <Input
                                multiline
                                placeholder="당신의 생각을 적어주세요..."
                                value={myAnswer}
                                onChange={(e) => setMyAnswer(e.target.value)}
                                maxLength={300}
                                showCharCount
                            />
                        )}
                    </div>

                    <div className="answer-divider">
                        <div className="divider-line"></div>
                        <span className="divider-icon">💕</span>
                        <div className="divider-line"></div>
                    </div>

                    <div className="answer-box">
                        <div className="answer-header">
                            <span className="answer-author">상대방({partnerName})의 답변</span>
                            <span className="answer-status-text">
                                {isPartnerAnswerSubmitted ? '✓ 작성완료' : '대기 중...'}
                            </span>
                        </div>

                        {isPartnerAnswerSubmitted ? (
                            bothSubmitted ? (
                                showPartnerAnswer ? (
                                    <div className="answer-display answer-reveal">
                                        <p>{partnerAnswer}</p>
                                    </div>
                                ) : (
                                    <div className="answer-locked">
                                        <div className="lock-icon">🔒</div>
                                        <p>상대방의 답변을 확인하시겠어요?</p>
                                        <Button variant="gradient" onClick={handleRevealAnswer}>
                                            답변 보기
                                        </Button>
                                    </div>
                                )
                            ) : (
                                <div className="answer-locked">
                                    <div className="lock-icon">🎁</div>
                                    <p>상대방의 답변이 도착했습니다!</p>
                                    <p className="sub-text">내 답변을 작성하면 확인할 수 있어요.</p>
                                </div>
                            )
                        ) : (
                            <div className="answer-pending">
                                <p>아직 답변이 도착하지 않았어요.</p>
                            </div>
                        )}
                    </div>
                </div>

                {!isMyAnswerSubmitted && (
                    <div className="submit-section">
                        <Button
                            variant="gradient"
                            size="large"
                            fullWidth
                            onClick={handleSubmitMock}
                        >
                            답변 제출하기
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionAnswer;
