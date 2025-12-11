import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { addAnniversary } from '../../api/anniversary';
import './AddAnniversary.css';

const AddAnniversary: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [repeat, setRepeat] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !date) {
            alert('기념일 이름과 날짜를 입력해주세요.');
            return;
        }

        setSubmitting(true);
        try {
            await addAnniversary({ title, date, repeat });
            alert('기념일이 추가되었습니다! 🎉');
            navigate('/profile');
        } catch (error) {
            alert('기념일 추가에 실패했습니다.');
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="add-anniversary-page page-container">
            <div className="anniversary-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← 뒤로
                </button>
                <h1>기념일 추가</h1>
            </div>

            <form onSubmit={handleSubmit} className="anniversary-form">
                <div className="form-section">
                    <label className="form-label">기념일 이름</label>
                    <Input
                        type="text"
                        placeholder="예: 우리가 만난 날, 100일 기념일"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={50}
                    />
                </div>

                <div className="form-section">
                    <label className="form-label">날짜</label>
                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div className="form-section checkbox-section">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={repeat}
                            onChange={(e) => setRepeat(e.target.checked)}
                            className="checkbox-input"
                        />
                        <span>매년 반복</span>
                    </label>
                    <p className="checkbox-description">
                        매년 이 날짜에 알림을 받습니다
                    </p>
                </div>

                <div className="form-actions">
                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        fullWidth
                        disabled={submitting}
                    >
                        {submitting ? '저장 중...' : '기념일 추가하기'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddAnniversary;
