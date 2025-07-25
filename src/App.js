import React, { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import 'reactflow/dist/style.css';
import './App.css';
import CustomNode from './CustomNode';
import { v4 as uuidv4 } from 'uuid';


const nodeTypes = { messageNode: CustomNode };

const getFlowKey = () => 'chatbot-flow-data';

function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [error, setError] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const storedFlow = localStorage.getItem(getFlowKey());
    if (storedFlow) {
      const parsed = JSON.parse(storedFlow);
      setNodes(parsed.nodes || []);
      setEdges(parsed.edges || []);
    }
  }, []);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const addNode = () => {
    const id = uuidv4();
    setNodes((nds) => [
      ...nds,
      {
        id,
        type: 'messageNode',
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: { label: 'Send Message', message: 'textNode' },
      },
    ]);
  };

  const saveFlow = () => {
    if (!nodes.length) return setError(true);
    setError(false);
    const flow = JSON.stringify({ nodes, edges });
    localStorage.setItem(getFlowKey(), flow);
    alert('Flow saved!');
  };

  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      <ReactFlowProvider>
        <div style={{ flex: 1 }}>
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
        <div style={{ width: 250, padding: 10, borderLeft: '1px solid #ccc' }}>
          <button onClick={addNode}>➕ Message</button>
          <button onClick={saveFlow} style={{ marginTop: 10 }}>
            💾 Save Changes
          </button>
          {error && <p style={{ color: 'red' }}>Cannot save Flow</p>}
        </div>
      </ReactFlowProvider>
    </div>
  );
}

export default FlowBuilder;
