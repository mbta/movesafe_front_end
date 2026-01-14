import { create } from 'zustand';
import { ILine } from "@repo/models";
import { StorageNames } from '@repo/constants/constants';

interface ILinesStore {
    lines: ILine[];
    setLines: (lines: ILine[]) => void;
    selectedLine: ILine | null;
    setSelectedLine: (line: ILine) => void;
    initializeState: () => void;
}

const useLinesStore = create<ILinesStore>((set) => ({
    lines: [],
    setLines: (lines: ILine[]) => set(() => ({ lines })),
    selectedLine: null,
    setSelectedLine: (line: ILine) => {
        set(() => ({ selectedLine: line }))
        if (typeof window !== 'undefined') {
            localStorage.setItem(StorageNames.selectedLine, JSON.stringify(line));
        }
    },
    initializeState: () => {
        let initialLine: string | null = "";
        if (typeof window !== 'undefined')
            initialLine = localStorage.getItem(StorageNames.selectedLine);

        if (initialLine)
            set(() => ({ selectedLine: JSON.parse(initialLine) }));
    },
}))

useLinesStore.getState().initializeState();

export default useLinesStore;