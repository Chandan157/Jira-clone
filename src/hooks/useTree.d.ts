import { TreeNode } from "../types";
export default function useTree(initialData: TreeNode[]): {
    readonly nodes: TreeNode[];
    readonly toggleExpand: (nodeId: string) => void;
    readonly loadChildren: (nodeId: string) => Promise<void>;
    readonly addNode: (parentId: string, name: string) => void;
    readonly deleteNode: (nodeId: string) => void;
    readonly editNode: (nodeId: string, newName: string) => void;
    readonly moveNode: (nodeId: string, targetParentId: string | null) => void;
    readonly setNodes: import("react").Dispatch<import("react").SetStateAction<TreeNode[]>>;
};
//# sourceMappingURL=useTree.d.ts.map