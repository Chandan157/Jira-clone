import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import KanbanColumnComponent from "./KanbanColumn";
import "../styles/KanbanBoard.css";
import useKanban from "../hooks/useKanban";
export default function KanbanBoard({ initialColumns }) {
    const { columns, addCard, deleteCard, editCard, moveCard } = useKanban(initialColumns);
    return (_jsxs("div", { className: "kanban-board", children: [_jsx("h1", { children: "Kanban Board" }), _jsx("div", { className: "kanban-columns", children: columns.map((column) => (_jsx(KanbanColumnComponent, { column: column, onAddCard: addCard, onDeleteCard: deleteCard, onEditCard: (colId, cardId, newTitle) => {
                        editCard(colId, cardId, newTitle);
                    }, onMoveCard: moveCard }, column.id))) })] }));
}
//# sourceMappingURL=KanbanBoard.js.map