export interface User {
    id: string;
    name: string;
    email: string;
    bloodType: string;
    birthday?: string;
    profilePhoto?: string;
}

export interface Couple {
    user: User;
    partner: User;
    anniversaryDate: string;
    daysTogetherCount: number;
    questionsAnswered: number;
    banyeomong: {
        species: 'puppy' | 'cat' | 'penguin' | 'panda';
        level: number;
        color: string;
        name: string;
        happiness: number;
    };
}

export const mockUser: User = {
    id: 'user1',
    name: '김민지',
    email: 'minji@example.com',
    bloodType: 'A',
    birthday: '1998-05-14',
};

export const mockPartner: User = {
    id: 'user2',
    name: '이준호',
    email: 'junho@example.com',
    bloodType: 'B',
    birthday: '1997-08-23',
};

export const mockCouple: Couple = {
    user: mockUser,
    partner: mockPartner,
    anniversaryDate: '2023-03-15',
    daysTogetherCount: 628,
    questionsAnswered: 245,
    banyeomong: {
        species: 'puppy',
        level: 12,
        color: '#FFB3D9',
        name: '몽이',
        happiness: 85,
    },
};
