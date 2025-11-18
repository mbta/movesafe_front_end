import { create } from 'zustand';
import { IMove } from "@repo/models";

interface IMovesStore {
    moves: IMove[];
    setmoves: (moves: IMove[]) => void;
    selectedMove: IMove | null;
    setSelectedMove: (Move: IMove) => void;
}

const useMovesStore = create<IMovesStore>((set) => ({
    moves: [],
    setmoves: (moves: IMove[]) => set(() => ({ moves })),
    selectedMove: null,
    setSelectedMove: (Move: IMove) => set(() => ({ selectedMove: Move })),
}))

export default useMovesStore;