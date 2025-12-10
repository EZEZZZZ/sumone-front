import client from './client';

export interface EmotionRecord {
    emotion: string; // e.g. "happy", "sad"
    intensity: number;
    memo?: string;
    createdAt?: string;
}

export const recordEmotion = async (emotion: string, intensity: number, memo?: string): Promise<void> => {
    await client.post('/emotions', { emotion, intensity, memo });
};

export const getTodayEmotion = async (): Promise<EmotionRecord | { recorded: false }> => {
    try {
        const response = await client.get<EmotionRecord>('/emotions/today');
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            return { recorded: false };
        }
        throw error;
    }
};
