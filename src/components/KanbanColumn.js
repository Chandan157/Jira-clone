import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import KanbanCardComponent from "./KanbanCard";
export default function KanbanColumnComponent({ column, onAddCard, onDeleteCard, onEditCard, onMoveCard, }) {
    const [dragOverIndex, setDragOverIndex] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const handleDragOver = (e, index) => {
        e.preventDefault();
        setDragOverIndex(index);
    };
    const handleDragLeave = () => {
        setDragOverIndex(null);
    };
    const handleDrop = (e, index) => {
        e.preventDefault();
        setDragOverIndex(null);
        const dragData = e.dataTransfer.getData("card");
        if (!dragData)
            return;
        const { fromColumnId, cardId } = JSON.parse(dragData);
        if (fromColumnId !== column.id ||
            column.cards.findIndex((c) => c.id === cardId) !== index) {
            onMoveCard(fromColumnId, column.id, cardId, index);
        }
    };
    const handleDragOverColumn = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setDragOverIndex(column.cards.length);
    };
    const handleDropOnColumn = (e) => {
        e.preventDefault();
        setDragOverIndex(null);
        const dragData = e.dataTransfer.getData("card");
        if (!dragData)
            return;
        const { fromColumnId, cardId } = JSON.parse(dragData);
        if (fromColumnId !== column.id ||
            column.cards.findIndex((c) => c.id === cardId) !== column.cards.length) {
            onMoveCard(fromColumnId, column.id, cardId, column.cards.length);
        }
    };
    const startAdd = () => {
        setIsAdding(true);
        setNewTitle("");
    };
    const cancelAdd = () => {
        setIsAdding(false);
        setNewTitle("");
    };
    const submitAdd = () => {
        const title = newTitle.trim();
        if (!title)
            return;
        onAddCard(column.id, title);
        setIsAdding(false);
        setNewTitle("");
    };
    return (_jsxs("div", { className: "kanban-column", children: [_jsxs("div", { className: "column-header", children: [_jsx("h2", { children: column.title }), _jsx("span", { className: "card-count", children: column.cards.length })] }), _jsxs("div", { className: "column-cards", onDragOver: handleDragOverColumn, onDrop: handleDropOnColumn, onDragLeave: handleDragLeave, children: [column.cards.map((card, index) => (_jsxs("div", { children: [dragOverIndex === index && _jsx("div", { className: "drop-indicator" }), _jsx("div", { onDragOver: (e) => handleDragOver(e, index), onDragLeave: handleDragLeave, onDrop: (e) => handleDrop(e, index), children: _jsx(KanbanCardComponent, { card: card, onDelete: () => onDeleteCard(column.id, card.id), onEdit: (newTitle) => onEditCard(column.id, card.id, newTitle), onDragStart: (e) => {
                                        e.dataTransfer.effectAllowed = "move";
                                        e.dataTransfer.setData("card", JSON.stringify({
                                            fromColumnId: column.id,
                                            cardId: card.id,
                                        }));
                                    } }) })] }, card.id))), dragOverIndex === column.cards.length && (_jsx("div", { className: "drop-indicator" }))] }), _jsxs("div", { style: { padding: 8 }, children: [!isAdding && (_jsx("button", { className: "add-card-btn", onClick: startAdd, children: "+ Add Card" })), isAdding && (_jsxs("div", { className: "add-card-form", children: [_jsx("input", { className: "add-card-input", placeholder: "Card title...", value: newTitle, onChange: (e) => setNewTitle(e.target.value), onKeyDown: (e) => {
                                    if (e.key === "Enter")
                                        submitAdd();
                                    if (e.key === "Escape")
                                        cancelAdd();
                                } }), _jsxs("div", { style: { display: "flex", gap: 8, marginTop: 8 }, children: [_jsx("button", { className: "add-card-btn", onClick: submitAdd, children: "Add" }), _jsx("button", { className: "add-card-btn", onClick: cancelAdd, children: "Cancel" })] })] }))] })] }));
}
//# sourceMappingURL=KanbanColumn.js.map