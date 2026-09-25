// src/App.jsx
import React from 'react';
import Sidebar from './components/Sidebar';
import WatchAds from './pages/WatchAds';

function App() {
  return (
    <div className="d-flex vh-100 overflow-hidden bg-dark">
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar />
      
      {/* Right Column Workspace */}
      <WatchAds />
    </div>
  );
}

export default App;