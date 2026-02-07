import React, { useState, useRef, useEffect } from "react";
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

export default function TreeNodeComponent({
  node,
  onToggleExpand,
  onLoadChildren,
  onAddNode,
  onDeleteNode,
  onEditNode,
  onMoveNode,
  level = 0,
}: TreeNodeProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragOverPosition, setDragOverPosition] = useState<
    "above" | "below" | "inside" | null
  >(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const hasChildren = node.children && node.children.length > 0;

  const handleExpandClick = async () => {
    if (!node.isExpanded && (!hasChildren || node.children!.length === 0)) {
      await onLoadChildren(node.id);
    }
    onToggleExpand(node.id);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const threshold = rect.height / 3;

    setIsDragOver(true);

    if (y < threshold) {
      setDragOverPosition("above");
    } else if (y > threshold * 2) {
      setDragOverPosition("below");
    } else {
      setDragOverPosition("inside");
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setIsDragOver(false);
      setDragOverPosition(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setDragOverPosition(null);

    const nodeId = e.dataTransfer.getData("nodeId");
    if (nodeId && nodeId !== node.id) {
      onMoveNode(nodeId, node.id);
    }
  };

  return (
    <div className="tree-node-wrapper">
      <div
        className={`tree-node ${isDragOver ? "drag-over" : ""} ${dragOverPosition ? `drag-${dragOverPosition}` : ""}`}
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="tree-node-content">
          {hasChildren && (
            <button
              className={`expand-btn ${node.isExpanded ? "expanded" : ""}`}
              onClick={handleExpandClick}
              disabled={node.isLoading}
              title={node.isExpanded ? "Collapse" : "Expand"}
            >
              {node.isLoading ? "⏳" : node.isExpanded ? "▼" : "▶"}
            </button>
          )}
          {!hasChildren && <span className="expand-placeholder" />}

          <span className="node-icon">{node.name.charAt(0).toUpperCase()}</span>

          {!isEditing && (
            <span className="node-name" onDoubleClick={() => startEditing()}>
              {node.name}
            </span>
          )}

          {isEditing && (
            <input
              ref={inputRef}
              className="node-edit-input"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={() => commitEdit()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  commitEdit();
                } else if (e.key === "Escape") {
                  cancelEdit();
                }
              }}
            />
          )}

          {node.isLoading && <span className="loading">Loading...</span>}

          <div className="node-actions">
            <button
              className="action-btn add-btn"
              onClick={() => onAddNode(node.id)}
              title="Add child node"
            >
              +
            </button>
            <button
              className="action-btn edit-btn"
              onClick={() => startEditing()}
              title="Edit node name"
            >
              ✎
            </button>
            <button
              className="action-btn delete-btn"
              onClick={() => onDeleteNode(node.id)}
              title="Delete node"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {node.isExpanded && hasChildren && (
        <div className="tree-node-children">
          {node.children!.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              onToggleExpand={onToggleExpand}
              onLoadChildren={onLoadChildren}
              onAddNode={onAddNode}
              onDeleteNode={onDeleteNode}
              onEditNode={onEditNode}
              onMoveNode={onMoveNode}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
