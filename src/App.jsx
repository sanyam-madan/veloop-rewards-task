import Sidebar from './components/Sidebar';
import WatchAds from './pages/WatchAds';

function App() {
  return (
    /* 🚀 FIXED: Changes from horizontal row to a vertical stack on mobile screens automatically */
    <div className="d-flex flex-column flex-md-row vh-100 overflow-hidden bg-light">
      {/* Left Navigation Sidebar */}
      <Sidebar />
      
      {/* Right Main Dashboard Workspace Container */}
      <WatchAds />
    </div>
  );
}

export default App;