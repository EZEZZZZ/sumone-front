import { getMe } from './auth';

export interface Mission {
    missionId: number;
    title: string;
    type: 'ACTION' | 'QUESTION';
    date: string;
    performed: boolean; // Me
    partnerPerformed?: boolean; // Partner
    evidence?: string;

    // Internal
    performedBy?: Record<number, boolean>;
}

export interface MissionHistoryItem extends Mission { }

const STORAGE_KEY = 'sumone_missions_v2';

const DEFAULT_MISSIONS = [
    { missionId: 4, title: "포옹 30초 이상 하기", type: 'ACTION', date: "2025-12-11", performedBy: { 1: false, 2: false } },
    { missionId: 3, title: "함께 요리하기", type: 'ACTION', date: "2025-12-10", performedBy: { 1: false, 2: true } },
    { missionId: 2, title: "서로 칭찬 3가지 해주기", type: 'QUESTION', date: "2025-12-09", performedBy: { 1: true, 2: false } },
    { missionId: 1, title: "손잡고 산책하기", type: 'ACTION', date: "2025-12-08", performedBy: { 1: true, 2: true } },
];

const loadRawData = (): any[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MISSIONS));
    return DEFAULT_MISSIONS;
};

const saveData = (data: any[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const formatMission = (m: any, userId: number, partnerId: number): Mission => {
    const performed = m.performedBy ? !!m.performedBy[userId] : false;
    const partnerPerformed = m.performedBy ? !!m.performedBy[partnerId] : false;

    return {
        ...m,
        performed,
        partnerPerformed
    };
};

export const getTodayMission = async (): Promise<{ mission: Mission | null }> => {
    const me = await getMe();
    const partnerId = me.partnerId!;

    const missions = loadRawData();
    const raw = missions.find(m => m.missionId === 4) || missions[0];

    return Promise.resolve({ mission: formatMission(raw, me.userId, partnerId) });
};

export const completeMission = async (evidence: string, imageUrl?: string): Promise<void> => {
    const me = await getMe();
    const missions = loadRawData();

    const updated = missions.map(m => {
        if (m.missionId === 4) { // Today
            const newPerformedBy = { ...(m.performedBy || {}), [me.userId]: true };
            return { ...m, performedBy: newPerformedBy, evidence };
        }
        return m;
    });
    saveData(updated);
    return Promise.resolve();
};

export const getMissionHistory = async (page = 0, size = 20): Promise<{ missions: MissionHistoryItem[], page: number, size: number, totalPages: number }> => {
    const me = await getMe();
    const partnerId = me.partnerId!;
    const missions = loadRawData();

    const sorted = [...missions].sort((a, b) => b.missionId - a.missionId);
    const items = sorted.map(m => formatMission(m, me.userId, partnerId));

    return Promise.resolve({
        missions: items,
        page,
        size,
        totalPages: 1
    });
};

export const getMissionDetail = async (missionId: number): Promise<Mission> => {
    const me = await getMe();
    const partnerId = me.partnerId!;
    const missions = loadRawData();
    const raw = missions.find(m => m.missionId === Number(missionId));
    if (!raw) throw new Error('Not found');

    return Promise.resolve(formatMission(raw, me.userId, partnerId));
};
