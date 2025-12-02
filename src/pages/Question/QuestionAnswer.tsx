import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { getQuestionById } from '../../data/mockQuestions';
import { mockCouple } from '../../data/mockUser';
import './QuestionAnswer.css';

const QuestionAnswer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const question = id ? getQuestionById(id) : null;
    const { user, partner } = mockCouple;

    const [answer, setAnswer] = useState(question?.userAnswer || '');
    const [showPartnerAnswer, setShowPartnerAnswer] = useState(false);

    if (!question) {
        return <div>Question not found</div>;
    }

    const handleSubmit = () => {
        alert('답변이 제출되었습니다!');
        navigate('/home');
    };

    const handleRevealAnswer = () => {
        setShowPartnerAnswer(true);
    };

    const bothAnswered = question.answeredByUser && question.answeredByPartner;

    return (
        <div className="question-answer-page page-container">
            <div className="question-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← 뒤로
                </button>
                <span className="question-date">{question.date}</span>
            </div>

            <div className="question-content">
                <div className="question-category-badge">{question.category}</div>

                <h1 className="question-title">{question.question}</h1>

                <div className="answer-section">
                    <div className="answer-box">
                        <div className="answer-header">
                            <span className="answer-author">{user.name}의 답변</span>
                            <span className="answer-status-text">
                                {question.answeredByUser ? '✓ 작성완료' : '작성 중...'}
                            </span>
                        </div>

                        {question.answeredByUser ? (
                            <div className="answer-display">
                                <p>{question.userAnswer}</p>
                            </div>
                        ) : (
                            <Input
                                multiline
                                placeholder="당신의 생각을 적어주세요..."
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                maxLength={100}
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
                            <span className="answer-author">{partner.name}의 답변</span>
                            <span className="answer-status-text">
                                {question.answeredByPartner ? '✓ 작성완료' : '대기 중...'}
                            </span>
                        </div>

                        {bothAnswered ? (
                            showPartnerAnswer ? (
                                <div className="answer-display answer-reveal">
                                    <p>{question.partnerAnswer}</p>
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
                            <div className="answer-pending">
                                <p>상대방이 답변을 작성 중이에요</p>
                                <div className="pending-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {!question.answeredByUser && (
                    <div className="submit-section">
                        <Button
                            variant="gradient"
                            size="large"
                            fullWidth
                            onClick={handleSubmit}
                            disabled={answer.trim().length === 0}
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
