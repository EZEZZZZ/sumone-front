export interface Question {
    id: string;
    category: string;
    question: string;
    date: string;
    userAnswer?: string;
    partnerAnswer?: string;
    answeredByUser: boolean;
    answeredByPartner: boolean;
}

export const mockQuestions: Question[] = [
    {
        id: '1',
        category: '감정',
        question: '오늘 나를 가장 행복하게 한 순간은 언제였나요?',
        date: '2025-12-02',
        userAnswer: '점심에 같이 먹은 순간이 정말 좋았어요',
        partnerAnswer: '당신과 함께한 모든 순간이요 💕',
        answeredByUser: true,
        answeredByPartner: true,
    },
    {
        id: '2',
        category: '추억',
        question: '우리가 처음 만났을 때 첫인상은 어땠나요?',
        date: '2025-12-01',
        userAnswer: '정말 멋있고 친절해 보였어요',
        partnerAnswer: '너무 예쁘고 웃음이 매력적이었어요',
        answeredByUser: true,
        answeredByPartner: true,
    },
    {
        id: '3',
        category: '미래',
        question: '10년 후 우리는 어떤 모습일까요?',
        date: '2025-11-30',
        userAnswer: '행복한 가정을 꾸리고 있을 것 같아요',
        partnerAnswer: '함께 여행 다니는 멋진 커플일 거예요',
        answeredByUser: true,
        answeredByPartner: true,
    },
    {
        id: '4',
        category: '취향',
        question: '가장 좋아하는 데이트 장소는 어디인가요?',
        date: '2025-11-29',
        userAnswer: '바닷가나 공원 같은 자연이 있는 곳',
        partnerAnswer: '맛집 탐방하는 것도 좋아해요',
        answeredByUser: true,
        answeredByPartner: true,
    },
    {
        id: '5',
        category: '재미',
        question: '내가 가진 특이한 습관이 있다면?',
        date: '2025-11-28',
        userAnswer: '자기 전에 꼭 베개를 정리해요',
        partnerAnswer: '음악 들으면서 춤추는 거요',
        answeredByUser: true,
        answeredByPartner: true,
    },
    {
        id: '6',
        category: '감정',
        question: '내가 당신을 가장 사랑한다고 느낀 순간은?',
        date: '2025-11-27',
        answeredByUser: false,
        answeredByPartner: false,
    },
    {
        id: '7',
        category: '추억',
        question: '우리의 가장 재미있었던 데이트는?',
        date: '2025-11-26',
        answeredByUser: false,
        answeredByPartner: false,
    },
    {
        id: '8',
        category: '미래',
        question: '함께 가보고 싶은 여행지는 어디인가요?',
        date: '2025-11-25',
        answeredByUser: false,
        answeredByPartner: false,
    },
    {
        id: '9',
        category: '취향',
        question: '내가 제일 좋아하는 음식은?',
        date: '2025-11-24',
        answeredByUser: false,
        answeredByPartner: false,
    },
    {
        id: '10',
        category: '재미',
        question: '만약 하루 동안 다른 사람이 될 수 있다면?',
        date: '2025-11-23',
        answeredByUser: false,
        answeredByPartner: false,
    },
];

export const getTodayQuestion = (): Question => {
    return mockQuestions[0];
};

export const getQuestionById = (id: string): Question | undefined => {
    return mockQuestions.find((q) => q.id === id);
};

export const getAnsweredQuestions = (): Question[] => {
    return mockQuestions.filter((q) => q.answeredByUser && q.answeredByPartner);
};
