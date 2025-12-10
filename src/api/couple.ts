import { getMe } from './auth';

export interface Partner {
    userId: number;
    name: string;
    email: string;
    profileImage?: string;
    birthday?: string;
}

export const getCoupleStatus = async (): Promise<boolean> => {
    return Promise.resolve(true);
};

export const connectCouple = async (code: string): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, 500));
};

export const generateCoupleCode = async (): Promise<{ code: string }> => {
    return Promise.resolve({ code: 'X92KS1' });
};

export const disconnectCouple = async (): Promise<void> => {
    return Promise.resolve();
};

export const getPartnerInfo = async (): Promise<Partner> => {
    const me = await getMe();

    if (me.userId === 1) {
        return Promise.resolve({
            userId: 2,
            name: '김땡땡',
            email: 'ex2@gmail.com',
            profileImage: '',
            birthday: '1995-12-25'
        });
    } else {
        return Promise.resolve({
            userId: 1,
            name: '이땡땡',
            email: 'ex1@gmail.com',
            profileImage: '',
            birthday: '1994-05-01'
        });
    }
};
