import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import './Auth.css';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            alert('이메일과 비밀번호를 입력해주세요.');
            return;
        }

        if (password !== '123456' && password !== '12345') { // Accepting 12345 as requested
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            await login(email);
            // Login successful
            navigate('/home');
        } catch (e) {
            alert('등록되지 않은 이메일입니다. (ex1@gmail.com 또는 ex2@gmail.com을 사용하세요)');
        }
    };

    return (
        <div className="login-page page-container">
            <div className="login-content">
                <div className="logo-area">
                    <div className="logo-placeholder">💕</div>
                    <h1 className="app-title">SumTwo</h1>
                    <p className="app-subtitle">우리만의 특별한 기록</p>
                </div>

                <div className="login-form-area" style={{ width: '100%', marginTop: '30px' }}>
                    <Input
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div style={{ height: '10px' }}></div>
                    <Input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div style={{ marginTop: '20px' }}>
                        <Button
                            variant="gradient"
                            fullWidth
                            size="large"
                            onClick={handleLogin}
                        >
                            로그인
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
