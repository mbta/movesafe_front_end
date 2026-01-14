import { create } from 'zustand';
import { IYard } from "@repo/models";
import { StorageNames } from '@repo/constants/constants';

interface IYardsStore {
    yards: IYard[];
    setYards: (yards: IYard[]) => void;
    selectedYard: IYard | null;
    setSelectedYard: (yard: IYard) => void;
    initializeState: () => void;
}

const useYardsStore = create<IYardsStore>((set) => ({
    yards: [],
    setYards: (yards: IYard[]) => set(() => ({ yards })),
    selectedYard: null,
    setSelectedYard: (yard: IYard) => {
        set(() => ({ selectedYard: yard }))
        if (typeof window !== 'undefined') {
            localStorage.setItem(StorageNames.selectedYard, JSON.stringify(yard));
        }
    },
    initializeState: () => {
        let initialYard: string | null = "";
        if (typeof window !== 'undefined')
            initialYard = localStorage.getItem(StorageNames.selectedYard);

        if (initialYard)
            set(() => ({ selectedYard: JSON.parse(initialYard) }));
    },
}))

useYardsStore.getState().initializeState();

export default useYardsStore;