# Tree View & Kanban Board Components

A fully functional React + TypeScript project featuring a reusable **TreeView** component and a **KanbanBoard** component with extensive features.

## 📋 Project Structure

```
├── src/
│   ├── components/
│   │   ├── TreeView.tsx       # Main tree view component
│   │   ├── TreeNode.tsx       # Individual tree node
│   │   ├── KanbanBoard.tsx    # Main kanban board component
│   │   ├── KanbanColumn.tsx   # Kanban column component
│   │   └── KanbanCard.tsx     # Individual kanban card
│   ├── styles/
│   │   ├── TreeView.css       # Tree view styling
│   │   ├── KanbanBoard.css    # Kanban board styling
│   │   ├── App.css            # App layout styling
│   │   └── index.css          # Global styles
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Entry point
│   ├── index.css              # Global styles
│   ├── types.ts               # TypeScript type definitions
│   └── mockData.ts            # Mock data and utilities
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies
└── index.html                 # HTML entry point
```

## 🌳 TreeView Component Features

### Core Functionality:

1. **Expand/Collapse Nodes** ▼/▶
   - Click arrow to toggle node expansion
   - Visual indicator for expanded state
   - Preserves expansion state during interactions

2. **Add New Node** ➕
   - Right-click or click "+" button on any parent node
   - Prompt for node name
   - Nodes can have unlimited children
   - Works on any level of the tree

3. **Remove Node** ✕
   - Delete any node and all its children
   - Confirmation dialog prevents accidental deletion
   - Hierarchy automatically adjusted

4. **Drag & Drop Support** 🎯
   - Drag nodes to reorder within same level
   - Move nodes to different parent nodes
   - Visual feedback during drag operation
   - Maintains complete tree hierarchy

5. **Lazy Loading** ⏳
   - Child nodes loaded on parent expansion
   - Simulates async API call (800ms delay)
   - Loading indicator during fetch
   - Mock data provided for demonstration

6. **Edit Node Name** ✎
   - Double-click node name or click edit button
   - Inline editing via prompt
   - Supports any node level

### Usage Example:

```tsx
import TreeView from "./components/TreeView";
import { mockTreeData } from "./mockData";

function MyComponent() {
  return <TreeView data={mockTreeData} />;
}
```

---

## 📊 KanbanBoard Component Features

### Core Functionality:

1. **Add/Delete Cards** ➕/✕
   - Add new cards with titles
   - Delete cards with single click
   - Confirmation dialog for deletion (optional)

2. **Move Cards Between Columns** 🎯
   - Drag cards between columns
   - Drag within same column to reorder
   - Drop indicator shows target position
   - Smooth animations

3. **Editable Card Titles** ✎
   - Click edit button to modify card text
   - Inline editing with prompt
   - Changes persist immediately

4. **Responsive Layout** 📱
   - Desktop: 3-column grid layout
   - Tablet: 2-column layout
   - Mobile: Single column (stacked vertically)
   - Smooth transitions between breakpoints

5. **Column Features**
   - Card counter on each column header
   - Color-coded headers (gradient)
   - Scrollable card lists
   - Add card button per column

### Usage Example:

```tsx
import KanbanBoard from "./components/KanbanBoard";
import { mockKanbanData } from "./mockData";

function MyComponent() {
  return <KanbanBoard initialColumns={mockKanbanData} />;
}
```

---

## 🚀 Installation & Setup

### Prerequisites:

- Node.js (v16+)
- npm or yarn

### Steps:

1. **Install Dependencies**

```bash
npm install
```

2. **Start Development Server**

```bash
npm run dev
```

The app will open at `http://localhost:3000`

3. **Build for Production**

```bash
npm run build
```

4. **Preview Production Build**

```bash
npm run preview
```

---

## 🎨 UI/UX Features

### TreeView Styling:

- Clean, minimal design with gradient background
- Hover effects on nodes
- Drag-over visual feedback
- Color-coded action buttons:
  - 🟢 Green: Add
  - 🔵 Blue: Edit
  - 🔴 Red: Delete

### KanbanBoard Styling:

- Modern gradient design
- Card shadows and transitions
- Column headers with card counts
- Responsive grid layout
- Smooth drag & drop feedback

---

## 📝 Type Definitions

### TreeNode

```typescript
interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  isExpanded?: boolean;
  isLoading?: boolean;
}
```

### KanbanCard

```typescript
interface KanbanCard {
  id: string;
  title: string;
}
```

### KanbanColumn

```typescript
interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}
```

---

## 🔧 Advanced Features

### State Management:

- React hooks (useState) for local state
- Callback patterns for parent-child communication
- Efficient re-rendering with proper dependency arrays

### Data Manipulation:

- Immutable state updates
- Recursive tree traversal for nested operations
- Proper ID generation using timestamps

### Drag & Drop:

- HTML5 native drag and drop API
- No external dependencies required
- Custom drag feedback and indicators

---

## 🎯 Technical Highlights

✅ **React 18** with functional components
✅ **TypeScript** for type safety
✅ **Vite** for fast development and building
✅ **CSS** for styling (no external UI libraries)
✅ **Clean Architecture** with component decomposition
✅ **Lazy Loading** simulation with async/await
✅ **Responsive Design** mobile-first approach
✅ **Minimal Dependencies** (only React + React-DOM)

---

## 🚦 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📄 License

MIT - Feel free to use in your projects!

---

## 💡 Tips & Tricks

1. **Double-click** node names in TreeView to edit
2. **Long press** on mobile devices for drag & drop
3. Use **Tab navigation** at top to switch between components
4. All changes are **instant** with no server calls needed
5. Mock data includes realistic file structure examples

---

## 🐛 Known Limitations & Future Enhancements

- No persistence (data resets on page refresh)
- No multi-select support (can be added)
- No keyboard shortcuts (can be implemented)
- No virtual scrolling for large trees (recommended for 1000+ nodes)
- No accessibility features (ARIA labels can be added)

---

## 📞 Support

For issues or questions, please review the code comments and TypeScript types for detailed explanations.

Enjoy building! 🎉
