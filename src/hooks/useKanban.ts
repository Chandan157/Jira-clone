import { useCallback, useState } from "react";
import { KanbanColumn } from "../types";

export default function useKanban(initialColumns: KanbanColumn[]) {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);

  const addCard = useCallback((columnId: string, title: string) => {
    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            cards: [...col.cards, { id: `card-${Date.now()}`, title }],
          };
        }
        return col;
      }),
    );
  }, []);

  const deleteCard = useCallback((columnId: string, cardId: string) => {
    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === columnId) {
          return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
        }
        return col;
      }),
    );
  }, []);

  const editCard = useCallback(
    (columnId: string, cardId: string, title: string) => {
      setColumns((prev) =>
        prev.map((col) => {
          if (col.id === columnId) {
            return {
              ...col,
              cards: col.cards.map((c) =>
                c.id === cardId ? { ...c, title } : c,
              ),
            };
          }
          return col;
        }),
      );
    },
    [],
  );

  const moveCard = useCallback(
    (
      fromColumnId: string,
      toColumnId: string,
      cardId: string,
      targetIndex: number,
    ) => {
      setColumns((prev) => {
        const copy = prev.map((c) => ({ ...c, cards: [...c.cards] }));
        const from = copy.find((c) => c.id === fromColumnId);
        const to = copy.find((c) => c.id === toColumnId);
        if (!from || !to) return prev;
        const idx = from.cards.findIndex((c) => c.id === cardId);
        if (idx === -1) return prev;
        const [card] = from.cards.splice(idx, 1);

        let adjustedIndex = targetIndex;
        if (fromColumnId === toColumnId && idx < targetIndex) {
          adjustedIndex = Math.max(0, targetIndex - 1);
        }

        to.cards.splice(Math.max(0, adjustedIndex), 0, card);
        return copy;
      });
    },
    [],
  );

  return {
    columns,
    addCard,
    deleteCard,
    editCard,
    moveCard,
    setColumns,
  } as const;
}
