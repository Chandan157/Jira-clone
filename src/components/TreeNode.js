import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
export default function TreeNodeComponent({ node, onToggleExpand, onLoadChildren, onAddNode, onDeleteNode, onEditNode, onMoveNode, level = 0, }) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [dragOverPosition, setDragOverPosition] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState("");
    const inputRef = useRef(null);
    const hasChildren = node.children && node.children.length > 0;
    const handleExpandClick = async () => {
        if (!node.isExpanded && (!hasChildren || node.children.length === 0)) {
            await onLoadChildren(node.id);
        }
        onToggleExpand(node.id);
    };
    const handleDragStart = (e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("nodeId", node.id);
        e.dataTransfer.setData("sourceParentId", "");
    };
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);
    const startEditing = () => {
        setEditValue(node.name);
        setIsEditing(true);
    };
    const commitEdit = () => {
        const trimmed = editValue.trim();
        setIsEditing(false);
        setEditValue("");
        if (trimmed && trimmed !== node.name) {
            onEditNode(node.id, trimmed);
        }
    };
    const cancelEdit = () => {
        setIsEditing(false);
        setEditValue("");
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        const rect = e.currentTarget.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const threshold = rect.height / 3;
        setIsDragOver(true);
        if (y < threshold) {
            setDragOverPosition("above");
        }
        else if (y > threshold * 2) {
            setDragOverPosition("below");
        }
        else {
            setDragOverPosition("inside");
        }
    };
    const handleDragLeave = (e) => {
        if (e.currentTarget === e.target) {
            setIsDragOver(false);
            setDragOverPosition(null);
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        setDragOverPosition(null);
        const nodeId = e.dataTransfer.getData("nodeId");
        if (nodeId && nodeId !== node.id) {
            onMoveNode(nodeId, node.id);
        }
    };
    return (_jsxs("div", { className: "tree-node-wrapper", children: [_jsx("div", { className: `tree-node ${isDragOver ? "drag-over" : ""} ${dragOverPosition ? `drag-${dragOverPosition}` : ""}`, draggable: true, onDragStart: handleDragStart, onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop, children: _jsxs("div", { className: "tree-node-content", children: [hasChildren && (_jsx("button", { className: `expand-btn ${node.isExpanded ? "expanded" : ""}`, onClick: handleExpandClick, disabled: node.isLoading, title: node.isExpanded ? "Collapse" : "Expand", children: node.isLoading ? "⏳" : node.isExpanded ? "▼" : "▶" })), !hasChildren && _jsx("span", { className: "expand-placeholder" }), _jsx("span", { className: "node-icon", children: node.name.charAt(0).toUpperCase() }), !isEditing && (_jsx("span", { className: "node-name", onDoubleClick: () => startEditing(), children: node.name })), isEditing && (_jsx("input", { ref: inputRef, className: "node-edit-input", value: editValue, onChange: (e) => setEditValue(e.target.value), onBlur: () => commitEdit(), onKeyDown: (e) => {
                                if (e.key === "Enter") {
                                    commitEdit();
                                }
                                else if (e.key === "Escape") {
                                    cancelEdit();
                                }
                            } })), node.isLoading && _jsx("span", { className: "loading", children: "Loading..." }), _jsxs("div", { className: "node-actions", children: [_jsx("button", { className: "action-btn add-btn", onClick: () => onAddNode(node.id), title: "Add child node", children: "+" }), _jsx("button", { className: "action-btn edit-btn", onClick: () => startEditing(), title: "Edit node name", children: "\u270E" }), _jsx("button", { className: "action-btn delete-btn", onClick: () => onDeleteNode(node.id), title: "Delete node", children: "\u2715" })] })] }) }), node.isExpanded && hasChildren && (_jsx("div", { className: "tree-node-children", children: node.children.map((child) => (_jsx(TreeNodeComponent, { node: child, onToggleExpand: onToggleExpand, onLoadChildren: onLoadChildren, onAddNode: onAddNode, onDeleteNode: onDeleteNode, onEditNode: onEditNode, onMoveNode: onMoveNode, level: level + 1 }, child.id))) }))] }));
}
//# sourceMappingURL=TreeNode.js.map