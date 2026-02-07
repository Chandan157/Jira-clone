export const mockTreeData = [
    {
        id: "1",
        name: "Project Root",
        isExpanded: true,
        children: [
            {
                id: "1-1",
                name: "src",
                isExpanded: true,
                children: [
                    { id: "1-1-1", name: "components", children: [] },
                    { id: "1-1-2", name: "utils", children: [] },
                    { id: "1-1-3", name: "types.ts", children: [] },
                ],
            },
            {
                id: "1-2",
                name: "public",
                isExpanded: false,
                children: [
                    { id: "1-2-1", name: "index.html", children: [] },
                    { id: "1-2-2", name: "favicon.ico", children: [] },
                ],
            },
            {
                id: "1-3",
                name: "package.json",
                children: [],
            },
        ],
    },
    {
        id: "2",
        name: "Documentation",
        isExpanded: false,
        children: [
            { id: "2-1", name: "README.md", children: [] },
            { id: "2-2", name: "CONTRIBUTING.md", children: [] },
        ],
    },
];
export const mockKanbanData = [
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
export const simulateLazyLoad = (parentId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockChildren = {
                "1-1": [
                    { id: "1-1-1", name: "TreeView.tsx", children: [] },
                    { id: "1-1-2", name: "TreeNode.tsx", children: [] },
                ],
                "1-2": [
                    { id: "1-2-1", name: "assets", children: [] },
                    { id: "1-2-2", name: "images", children: [] },
                ],
            };
            resolve(mockChildren[parentId] || []);
        }, 800);
    });
};
//# sourceMappingURL=mockData.js.map