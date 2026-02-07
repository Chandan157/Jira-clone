import { TreeNode } from "../types";
interface TreeNodeProps {
    node: TreeNode;
    onToggleExpand: (nodeId: string) => void;
    onLoadChildren: (nodeId: string) => Promise<void>;
    onAddNode: (parentId: string) => void;
    onDeleteNode: (nodeId: string) => void;
    onEditNode: (nodeId: string, newName: string) => void;
    onMoveNode: (nodeId: string, targetParentId: string | null) => void;
    level?: number;
}
export default function TreeNodeComponent({ node, onToggleExpand, onLoadChildren, onAddNode, onDeleteNode, onEditNode, onMoveNode, level, }: TreeNodeProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TreeNode.d.ts.map