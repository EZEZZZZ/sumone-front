import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import './Auth.css';

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        bloodType: '',
        birthday: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateStep1 = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) {
            newErrors.name = '이름을 입력해주세요';
        }
        if (!formData.email.trim()) {
            newErrors.email = '이메일을 입력해주세요';
        }
        if (!formData.password) {
            newErrors.password = '비밀번호를 입력해주세요';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
        }
        if (!formData.bloodType) {
            newErrors.bloodType = '혈액형을 선택해주세요';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleStep1Submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep1()) {
            setStep(2);
        }
    };

    const handleStep2Submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock signup - would call API
        navigate('/couple-connect');
    };

    return (
        <div className="auth-page page-container">
            <div className="auth-content">
                <div className="auth-header">
                    <h1 className="auth-title">회원가입</h1>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: step === 1 ? '50%' : '100%' }}
                        />
                    </div>
                </div>

                {step === 1 ? (
                    <form className="auth-form" onSubmit={handleStep1Submit}>
                        <Input
                            type="text"
                            name="name"
                            label="이름"
                            placeholder="이름을 입력하세요"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                            required
                        />

                        <Input
                            type="email"
                            name="email"
                            label="이메일"
                            placeholder="이메일을 입력하세요"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                        />

                        <Input
                            type="password"
                            name="password"
                            label="비밀번호"
                            placeholder="비밀번호를 입력하세요"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            required
                        />

                        <Input
                            type="password"
                            name="confirmPassword"
                            label="비밀번호 확인"
                            placeholder="비밀번호를 다시 입력하세요"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            required
                        />

                        <div className="input-wrapper">
                            <label className="input-label">혈액형</label>
                            <select
                                name="bloodType"
                                className="input-field"
                                value={formData.bloodType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">선택하세요</option>
                                <option value="A">A형</option>
                                <option value="B">B형</option>
                                <option value="O">O형</option>
                                <option value="AB">AB형</option>
                            </select>
                            {errors.bloodType && (
                                <div className="input-footer">
                                    <span className="input-error-text">{errors.bloodType}</span>
                                </div>
                            )}
                        </div>

                        <Button type="submit" variant="gradient" size="large" fullWidth>
                            다음
                        </Button>
                    </form>
                ) : (
                    <form className="auth-form" onSubmit={handleStep2Submit}>
                        <Input
                            type="date"
                            name="birthday"
                            label="생일"
                            value={formData.birthday}
                            onChange={handleChange}
                        />

                        <div className="profile-photo-section">
                            <label className="input-label">프로필 사진</label>
                            <div className="photo-upload">
                                <div className="photo-placeholder">
                                    <span>📷</span>
                                    <p>사진 추가</p>
                                </div>
                            </div>
                            <p className="input-helper-text">나중에 추가할 수 있어요</p>
                        </div>

                        <div className="form-actions">
                            <Button
                                type="button"
                                variant="ghost"
                                fullWidth
                                onClick={() => setStep(1)}
                            >
                                이전
                            </Button>
                            <Button type="submit" variant="gradient" size="large" fullWidth>
                                완료
                            </Button>
                        </div>
                    </form>
                )}

                <div className="auth-footer">
                    <p>
                        이미 계정이 있으신가요?{' '}
                        <Link to="/login" className="auth-link">
                            로그인
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
