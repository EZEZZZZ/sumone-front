import { getMe } from './auth';

export interface Question {
    questionId: number;
    question: string;
    date: string;
    answered: boolean; // Computed for current user
    category?: string;
    userAnswer?: string; // Computed
    partnerAnswer?: string; // Computed

    // Internal Storage Format
    answers?: Record<number, string>;
    partnerAnswers?: Record<number, string>; // Unused in new logic, simplified to 'answers'
}

export interface QuestionDetail extends Question { }

export interface QuestionHistoryItem {
    questionId: number;
    question: string;
    date: string;
    answered: boolean;
    answer: string | null;
}

const STORAGE_KEY = 'sumone_questions_v2';

const DEFAULT_QUESTIONS = [
    {
        questionId: 100,
        question: "오늘 하루는 어땠나요?",
        date: "2025-12-11",
        category: "Daily",
        answers: {} // Today: Empty
    },
    {
        questionId: 4,
        question: "가장 좋아하는 음식은?",
        date: "2025-12-10",
        category: "취향",
        answers: { 1: "떡볶이!", 2: "삼겹살이지" } // Both answered
    },
    {
        questionId: 3,
        question: "함께 가고 싶은 여행지는?",
        date: "2025-12-09",
        category: "여행",
        answers: { 1: "제주도 푸른 밤", 2: "유럽 배낭여행!" } // Both answered
    },
    {
        questionId: 2,
        question: "나의 첫인상은 어땠어?",
        date: "2025-12-08",
        category: "추억",
        answers: { 1: "차가워 보였는데 따뜻했어", 2: "눈이 예쁘다고 생각했어" }
    },
    {
        questionId: 1,
        question: "가장 좋아하는 계절은?",
        date: "2025-12-07",
        category: "취향",
        answers: { 1: "겨울! 눈이 좋거든", 2: "나는 여름! 물놀이가 좋아" }
    },
];

// Helper to load raw data
const loadRawData = (): any[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_QUESTIONS));
    return DEFAULT_QUESTIONS;
};

const saveData = (data: any[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Helper to format question for current user
const formatQuestionForUser = (q: any, userId: number, partnerId: number): Question => {
    const myAns = q.answers ? q.answers[userId] : undefined;
    const partnerAns = q.answers ? q.answers[partnerId] : undefined;

    return {
        questionId: q.questionId,
        question: q.question,
        date: q.date,
        category: q.category,
        answered: !!myAns,
        userAnswer: myAns,
        partnerAnswer: partnerAns,
        answers: q.answers
    };
};

export const getTodayQuestion = async (): Promise<Question> => {
    const me = await getMe();
    const partnerId = me.partnerId || (me.userId === 1 ? 2 : 1);

    const questions = loadRawData();
    const rawQ = questions.find(q => q.questionId === 100) || questions[0];

    return Promise.resolve(formatQuestionForUser(rawQ, me.userId, partnerId));
};

export const answerQuestion = async (questionId: number, answer: string): Promise<void> => {
    const me = await getMe();
    const questions = loadRawData();

    const updated = questions.map(q => {
        if (q.questionId === questionId) {
            const newAnswers = { ...(q.answers || {}), [me.userId]: answer };
            return { ...q, answers: newAnswers };
        }
        return q;
    });

    saveData(updated);
    return Promise.resolve();
};

export const getQuestionHistory = async (page = 0, size = 10): Promise<QuestionHistoryItem[]> => {
    const me = await getMe();
    const partnerId = me.partnerId!;
    const questions = loadRawData();

    const sorted = [...questions].sort((a, b) => b.questionId - a.questionId);

    const items = sorted.map(q => {
        const fmt = formatQuestionForUser(q, me.userId, partnerId);
        return {
            questionId: fmt.questionId,
            question: fmt.question,
            date: fmt.date,
            answered: fmt.answered,
            answer: fmt.userAnswer || null
        };
    });

    return Promise.resolve(items);
};

export const getQuestionDetail = async (questionId: number): Promise<QuestionDetail> => {
    const me = await getMe();
    const partnerId = me.partnerId!;

    const questions = loadRawData();
    const rawQ = questions.find(q => q.questionId === Number(questionId));
    if (!rawQ) throw new Error('Not found');

    return Promise.resolve(formatQuestionForUser(rawQ, me.userId, partnerId));
};

export const searchQuestions = async (keyword: string): Promise<{ questions: Question[]; totalPages: number }> => {
    const questions = await getQuestionHistory(); // Reuse logic
    const filtered = questions.filter(q => q.question.includes(keyword));
    // Need to return Question[] structure, effectively reusing formatted items but casting
    // For search, we just need basic info usually
    return Promise.resolve({ questions: filtered as any, totalPages: 1 });
};
