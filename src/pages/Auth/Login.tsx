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

    const handleGoogleLogin = () => {
        // Redirect to backend Google OAuth endpoint
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    return (
        <div className="auth-page page-container">
            <div className="auth-content">
                <div className="auth-header">
                    <h1 className="auth-logo gradient-text">SumTwo</h1>
                    <p className="auth-tagline">연인과 소중한 추억 쌓기</p>
                </div>
                <div className="social-login-buttons">
                    <button className="social-btn google" onClick={handleGoogleLogin}>
                        <span className="social-icon">G</span>
                        Google로 계속하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
