import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
export default function KanbanCardComponent({ card, onDelete, onEdit, onDragStart, }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(card.title);
    const inputRef = useRef(null);
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);
    const startEdit = () => {
        setEditValue(card.title);
        setIsEditing(true);
    };
    const commitEdit = () => {
        const trimmed = editValue.trim();
        setIsEditing(false);
        if (trimmed && trimmed !== card.title) {
            onEdit(trimmed);
        }
    };
    const cancelEdit = () => {
        setIsEditing(false);
        setEditValue(card.title);
    };
    return (_jsxs("div", { className: "kanban-card", draggable: true, onDragStart: onDragStart, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [_jsxs("div", { className: "card-content", onDoubleClick: () => startEdit(), children: [!isEditing && _jsx("p", { className: "card-title", children: card.title }), isEditing && (_jsx("input", { ref: inputRef, className: "card-edit-input", value: editValue, onChange: (e) => setEditValue(e.target.value), onBlur: () => commitEdit(), onKeyDown: (e) => {
                            if (e.key === "Enter")
                                commitEdit();
                            if (e.key === "Escape")
                                cancelEdit();
                        } }))] }), (isHovered || isEditing) && (_jsxs("div", { className: "card-actions", children: [_jsx("button", { className: "card-action-btn edit-btn", onClick: () => (isEditing ? commitEdit() : startEdit()), title: "Edit", children: "\u270E" }), _jsx("button", { className: "card-action-btn delete-btn", onClick: onDelete, title: "Delete", children: "\u2715" })] }))] }));
}
//# sourceMappingURL=KanbanCard.js.map