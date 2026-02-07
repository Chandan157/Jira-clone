import { KanbanColumn } from "../types";
export default function useKanban(initialColumns: KanbanColumn[]): {
    readonly columns: KanbanColumn[];
    readonly addCard: (columnId: string, title: string) => void;
    readonly deleteCard: (columnId: string, cardId: string) => void;
    readonly editCard: (columnId: string, cardId: string, title: string) => void;
    readonly moveCard: (fromColumnId: string, toColumnId: string, cardId: string, targetIndex: number) => void;
    readonly setColumns: import("react").Dispatch<import("react").SetStateAction<KanbanColumn[]>>;
};
//# sourceMappingURL=useKanban.d.ts.map