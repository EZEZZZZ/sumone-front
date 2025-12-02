import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import './Onboarding.css';

const Onboarding: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const slides = [
        {
            title: '매일, 연인과 더 가까워지는 시간',
            description: '하루 한 번, 질문에 답하며\n서로의 마음을 나눠보세요',
            emoji: '💕',
        },
        {
            title: '반려몽과 함께 성장하는 사랑',
            description: '질문과 답변을 나눌수록\n귀여운 반려몽이 자라나요',
            emoji: '🥚',
        },
        {
            title: '우리만의 소중한 기록',
            description: '쌓여가는 답변들이\n둘만의 특별한 추억이 됩니다',
            emoji: '📖',
        },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentSlide < slides.length - 1) {
                setCurrentSlide(currentSlide + 1);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [currentSlide, slides.length]);

    const handleGetStarted = () => {
        navigate('/login');
    };

    const handleSkip = () => {
        navigate('/login');
    };

    return (
        <div className="onboarding-page page-container">
            <button className="skip-button" onClick={handleSkip}>
                건너뛰기
            </button>

            <div className="onboarding-content">
                <div className="slide-wrapper">
                    <div className="emoji-circle">
                        <span className="emoji-large">{slides[currentSlide].emoji}</span>
                    </div>

                    <h1 className="onboarding-title gradient-text">
                        {slides[currentSlide].title}
                    </h1>

                    <p className="onboarding-description">
                        {slides[currentSlide].description}
                    </p>
                </div>

                <div className="slide-indicators">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`indicator ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>

                <div className="onboarding-actions">
                    <Button
                        variant="gradient"
                        size="large"
                        fullWidth
                        onClick={handleGetStarted}
                    >
                        시작하기
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
