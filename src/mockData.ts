import { TreeNode, KanbanColumn } from "./types";

export const mockTreeData: TreeNode[] = [
  {
    id: "1",
    name: "Animal Kingdom",
    isExpanded: true,
    children: [
      {
        id: "1-1",
        name: "Mammals",
        isExpanded: true,
        children: [
          { id: "1-1-1", name: "Lion", children: [] },
          { id: "1-1-2", name: "Elephant", children: [] },
          { id: "1-1-3", name: "Whale", children: [] },
        ],
      },
      {
        id: "1-2",
        name: "Birds",
        isExpanded: false,
        children: [
          { id: "1-2-1", name: "Eagle", children: [] },
          { id: "1-2-2", name: "Parrot", children: [] },
        ],
      },
      {
        id: "1-3",
        name: "Reptiles",
        children: [
          { id: "1-3-1", name: "Snake", children: [] },
          { id: "1-3-2", name: "Crocodile", children: [] },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Habitats",
    isExpanded: false,
    children: [
      { id: "2-1", name: "Forest", children: [] },
      { id: "2-2", name: "Ocean", children: [] },
    ],
  },
];

export const mockKanbanData: KanbanColumn[] = [
  {
    id: "todo",
    title: "Todo",
    cards: [
      { id: "card-1", title: "Design component layouts" },
      { id: "card-2", title: "Set up TypeScript" },
      { id: "card-3", title: "Create mock data" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      { id: "card-4", title: "Implement TreeView component" },
      { id: "card-5", title: "Add drag & drop support" },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      { id: "card-6", title: "Setup project structure" },
      { id: "card-7", title: "Install dependencies" },
    ],
  },
];

export const simulateLazyLoad = (parentId: string): Promise<TreeNode[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockChildren: Record<string, TreeNode[]> = {
        "1-1": [
          { id: "1-1-4", name: "Cub", children: [] },
          { id: "1-1-5", name: "Calf", children: [] },
        ],
        "1-2": [
          { id: "1-2-3", name: "Sparrow", children: [] },
          { id: "1-2-4", name: "Penguin", children: [] },
        ],
        "1-3": [
          { id: "1-3-3", name: "Lizard", children: [] },
          { id: "1-3-4", name: "Turtle", children: [] },
        ],
        "2-1": [
          { id: "2-1-1", name: "Oak Forest", children: [] },
          { id: "2-1-2", name: "Rainforest", children: [] },
        ],
        "2-2": [
          { id: "2-2-1", name: "Coral Reef", children: [] },
          { id: "2-2-2", name: "Deep Sea", children: [] },
        ],
      };
      resolve(mockChildren[parentId] || []);
    }, 800);
  });
};
