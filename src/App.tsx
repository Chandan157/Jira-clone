import React from "react";
import TreeView from "./components/TreeView";
import KanbanBoard from "./components/KanbanBoard";
import { mockTreeData, mockKanbanData } from "./mockData";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = React.useState<"tree" | "kanban">("tree");

  return (
    <div className="app">
      <nav className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === "tree" ? "active" : ""}`}
          onClick={() => setActiveTab("tree")}
        >
          🌳 Tree View
        </button>
        <button
          className={`tab-btn ${activeTab === "kanban" ? "active" : ""}`}
          onClick={() => setActiveTab("kanban")}
        >
          📊 Kanban Board
        </button>
      </nav>

      <div className="tab-content">
        {activeTab === "tree" && (
          <div className="tab-pane">
            <h1 className="component-title">Tree View Component</h1>
            <div className="component-description">
              <p>
                📌 Features: Expand/Collapse • Add Node • Delete Node • Edit
                Name • Drag & Drop • Lazy Loading
              </p>
            </div>
            <TreeView data={mockTreeData} />
          </div>
        )}

        {activeTab === "kanban" && (
          <div className="tab-pane">
            <KanbanBoard initialColumns={mockKanbanData} />
          </div>
        )}
      </div>
    </div>
  );
}
