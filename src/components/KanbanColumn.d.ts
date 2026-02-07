import { KanbanColumn } from "../types";
interface KanbanColumnProps {
    column: KanbanColumn;
    onAddCard: (columnId: string, title: string) => void;
    onDeleteCard: (columnId: string, cardId: string) => void;
    onEditCard: (columnId: string, cardId: string, newTitle: string) => void;
    onMoveCard: (fromColumnId: string, toColumnId: string, cardId: string, targetIndex: number) => void;
}
export default function KanbanColumnComponent({ column, onAddCard, onDeleteCard, onEditCard, onMoveCard, }: KanbanColumnProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=KanbanColumn.d.ts.map