import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Nodes Panel</h2>
      <div
        className="draggable-node"
        draggable
        onDragStart={(e) => e.dataTransfer.setData('application/reactflow', 'textNode')}
      >
        Text Node
      </div>
    </div>
  );
};

export default Sidebar;