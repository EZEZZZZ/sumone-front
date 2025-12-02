import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import './Auth.css';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login - in real app, would call API
        navigate('/home');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="auth-page page-container">
            <div className="auth-content">
                <div className="auth-header">
                    <h1 className="auth-logo gradient-text">SumOne</h1>
                    <p className="auth-tagline">연인과 소중한 추억 쌓기</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        name="email"
                        label="이메일"
                        placeholder="이메일을 입력하세요"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        type="password"
                        name="password"
                        label="비밀번호"
                        placeholder="비밀번호를 입력하세요"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <Button
                        type="submit"
                        variant="gradient"
                        size="large"
                        fullWidth
                    >
                        로그인
                    </Button>
                </form>

                <div className="auth-divider">
                    <span>또는</span>
                </div>

                <div className="social-login-buttons">
                    <button className="social-btn kakao">
                        <span className="social-icon">💬</span>
                        카카오로 계속하기
                    </button>
                    <button className="social-btn google">
                        <span className="social-icon">G</span>
                        Google로 계속하기
                    </button>
                    <button className="social-btn apple">
                        <span className="social-icon"></span>
                        Apple로 계속하기
                    </button>
                </div>

                <div className="auth-footer">
                    <p>
                        계정이 없으신가요?{' '}
                        <Link to="/signup" className="auth-link">
                            회원가입
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
