import { useCallback, useState } from "react";
import { simulateLazyLoad } from "../mockData";
export default function useTree(initialData) {
    const [nodes, setNodes] = useState(initialData);
    const toggleExpand = useCallback((nodeId) => {
        const updateNode = (nodeList) => {
            return nodeList.map((node) => {
                if (node.id === nodeId) {
                    return {
                        ...node,
                        isExpanded: !node.isExpanded,
                        children: node.children || [],
                    };
                }
                if (node.children) {
                    return {
                        ...node,
                        children: updateNode(node.children),
                    };
                }
                return node;
            });
        };
        setNodes((prev) => updateNode(prev));
    }, []);
    const loadChildren = useCallback(async (nodeId) => {
        const updateNode = async (nodeList) => {
            for (let node of nodeList) {
                if (node.id === nodeId) {
                    node.isLoading = true;
                    setNodes((n) => [...n]);
                    const children = await simulateLazyLoad(nodeId);
                    return nodeList.map((n) => {
                        if (n.id === nodeId) {
                            return {
                                ...n,
                                children: children.length > 0 ? children : node.children,
                                isLoading: false,
                            };
                        }
                        return n;
                    });
                }
                if (node.children && node.children.length > 0) {
                    node.children = await updateNode(node.children);
                }
            }
            return nodeList;
        };
        const updated = await updateNode(nodes);
        setNodes(updated);
    }, [nodes]);
    const addNode = useCallback((parentId, name) => {
        const updateNode = (nodeList) => {
            return nodeList.map((node) => {
                if (node.id === parentId) {
                    return {
                        ...node,
                        children: [
                            ...(node.children || []),
                            {
                                id: `${parentId}-${Date.now()}`,
                                name,
                                children: [],
                                isExpanded: false,
                            },
                        ],
                    };
                }
                if (node.children) {
                    return {
                        ...node,
                        children: updateNode(node.children),
                    };
                }
                return node;
            });
        };
        setNodes((prev) => updateNode(prev));
    }, []);
    const deleteNode = useCallback((nodeId) => {
        const updateNode = (nodeList) => {
            return nodeList
                .filter((node) => node.id !== nodeId)
                .map((node) => {
                if (node.children) {
                    return {
                        ...node,
                        children: updateNode(node.children),
                    };
                }
                return node;
            });
        };
        setNodes((prev) => updateNode(prev));
    }, []);
    const editNode = useCallback((nodeId, newName) => {
        const updateNode = (nodeList) => {
            return nodeList.map((node) => {
                if (node.id === nodeId) {
                    return { ...node, name: newName };
                }
                if (node.children) {
                    return {
                        ...node,
                        children: updateNode(node.children),
                    };
                }
                return node;
            });
        };
        setNodes((prev) => updateNode(prev));
    }, []);
    const moveNode = useCallback((nodeId, targetParentId) => {
        let nodeToMove = null;
        const findAndRemove = (nodeList) => {
            for (let i = 0; i < nodeList.length; i++) {
                const current = nodeList[i];
                if (!current)
                    continue;
                if (current.id === nodeId) {
                    const removed = nodeList.splice(i, 1);
                    nodeToMove = removed.length > 0 ? removed[0] : null;
                    break;
                }
                if (current.children && current.children.length > 0) {
                    current.children = findAndRemove(current.children);
                }
            }
            return nodeList;
        };
        const addToParent = (nodeList) => {
            if (!targetParentId) {
                if (!nodeToMove)
                    return nodeList;
                return [...nodeList, nodeToMove];
            }
            return nodeList.map((node) => {
                if (node.id === targetParentId) {
                    if (!nodeToMove)
                        return node;
                    return {
                        ...node,
                        children: [...(node.children || []), nodeToMove],
                    };
                }
                if (node.children) {
                    return {
                        ...node,
                        children: addToParent(node.children),
                    };
                }
                return node;
            });
        };
        setNodes((prev) => {
            const copy = JSON.parse(JSON.stringify(prev));
            const removed = findAndRemove(copy);
            return addToParent(removed);
        });
    }, []);
    return {
        nodes,
        toggleExpand,
        loadChildren,
        addNode,
        deleteNode,
        editNode,
        moveNode,
        setNodes,
    };
}
//# sourceMappingURL=useTree.js.map