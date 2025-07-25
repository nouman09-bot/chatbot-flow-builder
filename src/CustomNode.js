import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { FaWhatsapp } from 'react-icons/fa';

const CustomNode = ({ data, id }) => {
  const handleChange = (e) => {
    data.message = e.target.value;
  };

  return (
    <div style={{ padding: 10, borderRadius: 10, boxShadow: '0 2px 5px #aaa', backgroundColor: '#e0fdfa', border: '1px solid #0e9' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, alignItems: 'center' }}>
        <strong>🗨️ {data.label}</strong>
        <FaWhatsapp style={{ color: '#25D366' }} />
      </div>
      <textarea
        defaultValue={data.message}
        onChange={handleChange}
        placeholder="Type your message..."
        style={{
          width: '100%',
          minHeight: '40px',
          padding: 5,
          fontSize: '14px',
          resize: 'none',
        }}
      />
      <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
      <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
    </div>
  );
};

export default CustomNode;
