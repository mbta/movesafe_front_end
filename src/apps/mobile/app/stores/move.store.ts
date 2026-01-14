import { create } from 'zustand';
import { IMove } from "@repo/models";
import { StorageNames } from '@repo/constants/constants';

interface IMovesStore {
    moves: IMove[];
    setMoves: (moves: IMove[]) => void;
    assignedMove: IMove | null;
    setAssignedMove: (move: IMove | null) => void;
    initializeState: () => void;
}

const useMovesStore = create<IMovesStore>((set) => ({
    moves: [],
    setMoves: (moves: IMove[]) => set(() => ({ moves })),
    assignedMove: null,
    setAssignedMove: (move: IMove | null) => {
        set(() => ({ assignedMove: move }))
        if (typeof window !== 'undefined') {
            if (!move) {
                localStorage.removeItem(StorageNames.assignedMove);
                return;
            }

            localStorage.setItem(StorageNames.assignedMove, JSON.stringify(move));
        }
    },
    initializeState: () => {
        let initialMove: string | null = "";
        if (typeof window !== 'undefined')
            initialMove = localStorage.getItem(StorageNames.assignedMove);

        if (initialMove)
            set(() => ({ assignedMove: JSON.parse(initialMove) }));
    },
}))

useMovesStore.getState().initializeState();

export default useMovesStore;