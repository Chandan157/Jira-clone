import React, { useState, useRef, useEffect } from "react";
import { KanbanCard } from "../types";

interface KanbanCardProps {
  card: KanbanCard;
  onDelete: () => void;
  onEdit: (newTitle: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
}

export default function KanbanCardComponent({
  card,
  onDelete,
  onEdit,
  onDragStart,
}: KanbanCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(card.title);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  return (
    <div
      className="kanban-card"
      draggable
      onDragStart={onDragStart}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-content" onDoubleClick={() => startEdit()}>
        {!isEditing && <p className="card-title">{card.title}</p>}
        {isEditing && (
          <input
            ref={inputRef}
            className="card-edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={() => commitEdit()}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitEdit();
              if (e.key === "Escape") cancelEdit();
            }}
          />
        )}
      </div>
      {(isHovered || isEditing) && (
        <div className="card-actions">
          <button
            className="card-action-btn edit-btn"
            onClick={() => (isEditing ? commitEdit() : startEdit())}
            title="Edit"
          >
            ✎
          </button>
          <button
            className="card-action-btn delete-btn"
            onClick={onDelete}
            title="Delete"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
