import React from "react";
import { KanbanCard } from "../types";
interface KanbanCardProps {
    card: KanbanCard;
    onDelete: () => void;
    onEdit: (newTitle: string) => void;
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
}
export default function KanbanCardComponent({ card, onDelete, onEdit, onDragStart, }: KanbanCardProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=KanbanCard.d.ts.map