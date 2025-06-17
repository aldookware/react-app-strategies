import React from 'react';
import Layout from './components/Layout/Layout';
import './App.css';

function App() {
  return (
    <Layout>
      <div className="app-content">
        <h1>Welcome to JPMorgan Asset Management</h1>
        <p>Your financial management platform is ready.</p>
        {/* ...existing content... */}
      </div>
    </Layout>
  );
}

export default App;
