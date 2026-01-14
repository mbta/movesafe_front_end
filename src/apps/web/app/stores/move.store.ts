import { create } from 'zustand';
import { IMove } from "@repo/models";

interface IMoveStore {
    selectedMove: IMove | null;
    setSelectedMove: (move: IMove) => void;
}

const useMovesStore = create<IMoveStore>((set) => ({
    selectedMove: null,
    setSelectedMove: (move: IMove) => set(() => ({ selectedMove: move })),
}))

export default useMovesStore;