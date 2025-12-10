// Auth API (Mock with Multi-User Support)

export interface User {
    userId: number;
    name: string;
    email: string;
    profileImage?: string;
    connected: boolean;
    partnerId?: number;
}

const MOCK_USERS: Record<string, User> = {
    'ex1@gmail.com': { userId: 1, name: '이땡땡', email: 'ex1@gmail.com', connected: true, partnerId: 2 },
    'ex2@gmail.com': { userId: 2, name: '김땡땡', email: 'ex2@gmail.com', connected: true, partnerId: 1 },
};

const STORAGE_KEY_USER = 'sumone_current_user_email';

export const login = async (email: string): Promise<User> => {
    const user = MOCK_USERS[email];
    if (user) {
        localStorage.setItem(STORAGE_KEY_USER, email);
        localStorage.setItem('accessToken', 'mock-token-' + user.userId); // Keep token for legacy checks
        return Promise.resolve(user);
    }
    throw new Error('User not found');
};

export const getMe = async (): Promise<User> => {
    const email = localStorage.getItem(STORAGE_KEY_USER) || 'ex1@gmail.com'; // Default to User 1
    const user = MOCK_USERS[email];
    if (user) {
        return Promise.resolve(user);
    }
    // Fallback if email invalid
    return Promise.resolve(MOCK_USERS['ex1@gmail.com']);
};

export const logout = async (): Promise<void> => {
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem('accessToken');
    return Promise.resolve();
};
