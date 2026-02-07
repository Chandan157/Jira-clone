import { KanbanColumn } from "../types";
import KanbanColumnComponent from "./KanbanColumn";
import "../styles/KanbanBoard.css";
import useKanban from "../hooks/useKanban";

interface KanbanBoardProps {
  initialColumns: KanbanColumn[];
}

export default function KanbanBoard({ initialColumns }: KanbanBoardProps) {
  const { columns, addCard, deleteCard, editCard, moveCard } =
    useKanban(initialColumns);

  return (
    <div className="kanban-board">
      <h1>Kanban Board</h1>
      <div className="kanban-columns">
        {columns.map((column) => (
          <KanbanColumnComponent
            key={column.id}
            column={column}
            onAddCard={addCard}
            onDeleteCard={deleteCard}
            onEditCard={(colId, cardId, newTitle) => {
              editCard(colId, cardId, newTitle);
            }}
            onMoveCard={moveCard}
          />
        ))}
      </div>
    </div>
  );
}
