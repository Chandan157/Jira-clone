import { TreeNode } from "../types";
import TreeNodeComponent from "./TreeNode";
import "../styles/TreeView.css";
import useTree from "../hooks/useTree";

interface TreeViewProps {
  data: TreeNode[];
}

export default function TreeView({ data }: TreeViewProps) {
  const {
    nodes,
    toggleExpand,
    loadChildren,
    addNode,
    deleteNode,
    editNode,
    moveNode,
  } = useTree(data);

  return (
    <div className="tree-view">
      <div className="tree-view-container">
        {nodes.map((node) => (
          <TreeNodeComponent
            key={node.id}
            node={node}
            onToggleExpand={toggleExpand}
            onLoadChildren={loadChildren}
            onAddNode={(parentId: string) => {
              const name = prompt("Enter node name:");
              if (name) addNode(parentId, name);
            }}
            onDeleteNode={(nodeId: string) => {
              if (
                confirm(
                  "Are you sure you want to delete this node and all its children?",
                )
              ) {
                deleteNode(nodeId);
              }
            }}
            onEditNode={editNode}
            onMoveNode={moveNode}
          />
        ))}
      </div>
    </div>
  );
}
