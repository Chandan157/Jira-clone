import { useState } from "react";
import { KanbanColumn } from "../types";
import KanbanCardComponent from "./KanbanCard";

interface KanbanColumnProps {
  column: KanbanColumn;
  onAddCard: (columnId: string, title: string) => void;
  onDeleteCard: (columnId: string, cardId: string) => void;
  onEditCard: (columnId: string, cardId: string, newTitle: string) => void;
  onMoveCard: (
    fromColumnId: string,
    toColumnId: string,
    cardId: string,
    targetIndex: number,
  ) => void;
}

export default function KanbanColumnComponent({
  column,
  onAddCard,
  onDeleteCard,
  onEditCard,
  onMoveCard,
}: KanbanColumnProps) {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setDragOverIndex(null);

    const dragData = e.dataTransfer.getData("card");
    if (!dragData) return;

    const { fromColumnId, cardId } = JSON.parse(dragData);
    if (
      fromColumnId !== column.id ||
      column.cards.findIndex((c) => c.id === cardId) !== index
    ) {
      onMoveCard(fromColumnId, column.id, cardId, index);
    }
  };

  const handleDragOverColumn = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(column.cards.length);
  };

  const handleDropOnColumn = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOverIndex(null);

    const dragData = e.dataTransfer.getData("card");
    if (!dragData) return;

    const { fromColumnId, cardId } = JSON.parse(dragData);
    if (
      fromColumnId !== column.id ||
      column.cards.findIndex((c) => c.id === cardId) !== column.cards.length
    ) {
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
    if (!title) return;
    onAddCard(column.id, title);
    setIsAdding(false);
    setNewTitle("");
  };

  return (
    <div className="kanban-column">
      <div className="column-header">
        <h2>{column.title}</h2>
        <span className="card-count">{column.cards.length}</span>
      </div>

      <div
        className="column-cards"
        onDragOver={handleDragOverColumn}
        onDrop={handleDropOnColumn}
        onDragLeave={handleDragLeave}
      >
        {column.cards.map((card, index) => (
          <div key={card.id}>
            {dragOverIndex === index && <div className="drop-indicator" />}
            <div
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
            >
              <KanbanCardComponent
                card={card}
                onDelete={() => onDeleteCard(column.id, card.id)}
                onEdit={(newTitle: string) =>
                  onEditCard(column.id, card.id, newTitle)
                }
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = "move";
                  e.dataTransfer.setData(
                    "card",
                    JSON.stringify({
                      fromColumnId: column.id,
                      cardId: card.id,
                    }),
                  );
                }}
              />
            </div>
          </div>
        ))}
        {dragOverIndex === column.cards.length && (
          <div className="drop-indicator" />
        )}
      </div>

      <div style={{ padding: 8 }}>
        {!isAdding && (
          <button className="add-card-btn" onClick={startAdd}>
            + Add Card
          </button>
        )}

        {isAdding && (
          <div className="add-card-form">
            <input
              className="add-card-input"
              placeholder="Card title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitAdd();
                if (e.key === "Escape") cancelAdd();
              }}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button className="add-card-btn" onClick={submitAdd}>
                Add
              </button>
              <button className="add-card-btn" onClick={cancelAdd}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
