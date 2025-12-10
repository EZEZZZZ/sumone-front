import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/BottomNav';
import { getQuestionHistory, searchQuestions, QuestionHistoryItem, Question } from '../../api/question';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import './History.css';

const History: React.FC = () => {
    const navigate = useNavigate();
    const [historyQuestions, setHistoryQuestions] = useState<(QuestionHistoryItem | Question)[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [introMode, setIntroMode] = useState(false); // For search intro screen if needed 
    const [keyword, setKeyword] = useState('');

    const fetchHistory = async () => {
        setLoading(true);
        try {
            // Fetch recent history. Using page 0 and large size for now.
            const data = await getQuestionHistory(0, 100);
            setHistoryQuestions(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch history', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isSearchMode) {
            fetchHistory();
        }
    }, [isSearchMode]);

    const handleQuestionClick = (id: number) => {
        navigate(`/question/${id}`);
    };

    const toggleSearch = () => {
        setIsSearchMode(!isSearchMode);
        setKeyword('');
        if (!isSearchMode) {
            // Entering search mode, maybe clear list or keep it?
            setHistoryQuestions([]);
        }
    };

    const handleSearch = async () => {
        if (!keyword.trim()) return;
        setLoading(true);
        try {
            const result = await searchQuestions(keyword);
            setHistoryQuestions(result.questions || []);
            // Search history saving removed as it's not supported in current API
        } catch (error) {
            console.error('Search failed', error);
            setHistoryQuestions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="history-page page-container">
            <div className="history-header">
                {isSearchMode ? (
                    <div className="search-bar-wrapper" style={{ width: '100%', display: 'flex', gap: '8px' }}>
                        <Input
                            placeholder="질문 검색..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyPress={handleKeyPress}
                            style={{ marginBottom: 0 }}
                        />
                        <button onClick={toggleSearch} style={{ whiteSpace: 'nowrap', fontSize: '0.9rem' }}>취소</button>
                    </div>
                ) : (
                    <>
                        <h1>List</h1>
                        <button className="search-btn" onClick={toggleSearch}>
                            🔍
                        </button>
                    </>
                )}
            </div>

            {loading ? (
                <div className="page-container center-content">Loading...</div>
            ) : (
                <div className="question-list">
                    {historyQuestions.length > 0 ? (
                        historyQuestions.map((question, index) => (
                            <div
                                key={question.questionId}
                                className={`question-list-item ${question.answered ? 'answered' : ''}`}
                                onClick={() => handleQuestionClick(question.questionId)}
                            >
                                <span className="question-number">
                                    {isSearchMode ? '•' : `#${String(historyQuestions.length - index).padStart(2, '0')}`}
                                </span>
                                <div className="question-info">
                                    <span className="question-text">{question.question}</span>
                                    <span className="question-date-sm">{question.date}</span>
                                </div>
                                <span className="status-dot">{question.answered ? '✓' : ''}</span>
                            </div>
                        ))
                    ) : (
                        <div className="empty-history">
                            <p>{isSearchMode ? '검색 결과가 없습니다.' : '아직 기록된 추억이 없어요.'}</p>
                        </div>
                    )}
                </div>
            )}

            <BottomNav />
        </div>
    );
};

export default History;
