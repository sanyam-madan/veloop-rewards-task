import { useState } from 'react';
import Sidebar from './components/Sidebar';
import WatchAds from './pages/WatchAds';

function App() {
  // Central application state tracking drawer position on mobile viewports
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="d-flex flex-column flex-md-row vh-100 overflow-hidden bg-light position-relative">
      {/* Left Navigation Sidebar Drawer Pass-Downs */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Right Dashboard Workspace Container Pass-Downs */}
      <WatchAds toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default App;