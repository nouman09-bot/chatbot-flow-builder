import React, { useState } from 'react';
import FlowBuilder from './components/FlowBuilder';
import Sidebar from './components/Sidebar';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <FlowBuilder />
    </div>
  );
};

export default App;