import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';

let id = 0;
const getId = () => `node_${id++}`;

const TextNode = ({ data }) => {
  return (
    <div style={{ padding: 10, border: '1px solid #333', borderRadius: 5, background: 'white' }}>
      {data.label || 'Text Node'}
    </div>
  );
};

const nodeTypes = { textNode: TextNode };

const FlowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => {
      const sourceEdges = edges.filter(e => e.source === params.source);
      if (sourceEdges.length === 0) {
        setEdges((eds) => addEdge(params, eds));
      }
    },
    [edges, setEdges]
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      const position = { x: event.clientX - 220, y: event.clientY - 20 };
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: '' },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  return (
    <ReactFlowProvider>
      <div className="flow-builder" style={{ flexGrow: 1 }} onDrop={onDrop} onDragOver={(e) => e.preventDefault()}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default FlowBuilder;
