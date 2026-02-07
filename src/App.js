import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import TreeView from "./components/TreeView";
import KanbanBoard from "./components/KanbanBoard";
import { mockTreeData, mockKanbanData } from "./mockData";
import "./App.css";
export default function App() {
    const [activeTab, setActiveTab] = React.useState("tree");
    return (_jsxs("div", { className: "app", children: [_jsxs("nav", { className: "tab-navigation", children: [_jsx("button", { className: `tab-btn ${activeTab === "tree" ? "active" : ""}`, onClick: () => setActiveTab("tree"), children: "\uD83C\uDF33 Tree View" }), _jsx("button", { className: `tab-btn ${activeTab === "kanban" ? "active" : ""}`, onClick: () => setActiveTab("kanban"), children: "\uD83D\uDCCA Kanban Board" })] }), _jsxs("div", { className: "tab-content", children: [activeTab === "tree" && (_jsxs("div", { className: "tab-pane", children: [_jsx("h1", { className: "component-title", children: "Tree View Component" }), _jsx("div", { className: "component-description", children: _jsx("p", { children: "\uD83D\uDCCC Features: Expand/Collapse \u2022 Add Node \u2022 Delete Node \u2022 Edit Name \u2022 Drag & Drop \u2022 Lazy Loading" }) }), _jsx(TreeView, { data: mockTreeData })] })), activeTab === "kanban" && (_jsx("div", { className: "tab-pane", children: _jsx(KanbanBoard, { initialColumns: mockKanbanData }) }))] })] }));
}
//# sourceMappingURL=App.js.map