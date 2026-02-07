export interface TreeNode {
    id: string;
    name: string;
    children?: TreeNode[];
    isExpanded?: boolean;
    isLoading?: boolean;
}
export interface KanbanCard {
    id: string;
    title: string;
}
export interface KanbanColumn {
    id: string;
    title: string;
    cards: KanbanCard[];
}
//# sourceMappingURL=types.d.ts.map