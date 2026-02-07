import { jsx as _jsx } from "react/jsx-runtime";
import TreeNodeComponent from "./TreeNode";
import "../styles/TreeView.css";
import useTree from "../hooks/useTree";
export default function TreeView({ data }) {
    const { nodes, toggleExpand, loadChildren, addNode, deleteNode, editNode, moveNode, } = useTree(data);
    return (_jsx("div", { className: "tree-view", children: _jsx("div", { className: "tree-view-container", children: nodes.map((node) => (_jsx(TreeNodeComponent, { node: node, onToggleExpand: toggleExpand, onLoadChildren: loadChildren, onAddNode: (parentId) => {
                    const name = prompt("Enter node name:");
                    if (name)
                        addNode(parentId, name);
                }, onDeleteNode: (nodeId) => {
                    if (confirm("Are you sure you want to delete this node and all its children?")) {
                        deleteNode(nodeId);
                    }
                }, onEditNode: editNode, onMoveNode: moveNode }, node.id))) }) }));
}
//# sourceMappingURL=TreeView.js.map