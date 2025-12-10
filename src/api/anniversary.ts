// LocalStorage Anniversary API

export interface Anniversary {
    anniversaryId: number;
    title: string;
    date: string;
    repeat: boolean;
    memo?: string;
}

const STORAGE_KEY = 'sumone_anniversaries';

const DEFAULT_ANNIVERSARIES: Anniversary[] = [
    { anniversaryId: 1, title: "우리가 만난 날", date: "2024-01-01", repeat: true },
    { anniversaryId: 2, title: "발렌타인데이", date: "2024-02-14", repeat: true },
];

const loadData = (): Anniversary[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        return JSON.parse(data);
    }
    // Initialize with default
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ANNIVERSARIES));
    return DEFAULT_ANNIVERSARIES;
};

const saveData = (data: Anniversary[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getAnniversaries = async (): Promise<Anniversary[]> => {
    return Promise.resolve(loadData());
};

export const addAnniversary = async (data: Omit<Anniversary, 'anniversaryId'>): Promise<void> => {
    const current = loadData();
    const newId = current.length > 0 ? Math.max(...current.map(a => a.anniversaryId)) + 1 : 1;
    const newAnniversary = { ...data, anniversaryId: newId };
    saveData([...current, newAnniversary]);
    return Promise.resolve();
};

export const deleteAnniversary = async (anniversaryId: number): Promise<void> => {
    const current = loadData();
    const filtered = current.filter(a => a.anniversaryId !== anniversaryId);
    saveData(filtered);
    return Promise.resolve();
};
