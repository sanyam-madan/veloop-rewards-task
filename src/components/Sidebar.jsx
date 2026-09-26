
import { 
  LayoutDashboard, 
  PlaySquare, 
  Award, 
  Wallet, 
  History, 
  User, 
  Settings, 
  HelpCircle,
  X 
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { icon: <PlaySquare size={18} />, label: 'Watch Ads', active: true },
    { icon: <Award size={18} />, label: 'Rewards' },
    { icon: <Wallet size={18} />, label: 'Wallet' },
    { icon: <History size={18} />, label: 'History' },
    { icon: <User size={18} />, label: 'Profile' },
    { icon: <Settings size={18} />, label: 'Settings' },
    { icon: <HelpCircle size={18} />, label: 'Help & Support' }
  ];

  return (
    <>
      {/* Background Dim Backdrop Layer: ONLY visible on mobile screens when opened */}
      {isOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-md-none"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 1040, backdropFilter: 'blur(2px)' }}
          onClick={toggleSidebar}
        />
      )}

      {/* 🚀 FIXED CSS CLASSES: Enforces 'd-md-flex' at all times on desktop, regardless of mobile open state state toggles */}
      <aside 
        className={`p-3 border-end flex-shrink-0 flex-column h-100 ${
          isOpen ? 'd-flex position-fixed' : 'd-none'
        } d-md-flex position-md-sticky top-0 start-0`} 
        style={{ 
          width: '260px', 
          backgroundColor: 'var(--bg-sidebar)', 
          borderColor: 'var(--border-light)',
          zIndex: 1050,
          left: 0
        }}
      >
        {/* Header containing Branding Logo and Close X button tag */}
        <div className="d-flex align-items-center justify-content-between mb-4 mt-2 px-2">
          <span className="fw-bold fs-4" style={{ color: '#7c3aed', letterSpacing: '-0.5px' }}>VELOOP</span>
          
          {/* Close Navigation bar button (Hidden completely on desktop layouts) */}
          <button 
            className="btn p-1 d-md-none border-0 text-secondary"
            onClick={toggleSidebar}
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Navigation Items Links Map */}
        <ul className="nav nav-pills flex-column mb-auto gap-1">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <a 
                href="#" 
                className="nav-link d-flex align-items-center gap-3 py-2.5 px-3 rounded-3 fw-medium"
                style={{
                  backgroundColor: item.active ? '#7c3aed' : 'transparent',
                  color: item.active ? '#ffffff' : '#4b5563',
                  fontSize: '0.9rem'
                }}
              >
                <span style={{ color: item.active ? '#ffffff' : '#64748b' }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
        
        <div 
          className="mt-auto p-3 rounded-4 text-center border"
          style={{ backgroundColor: '#f8fafc', borderColor: 'var(--border-light)' }}
        >
          <p className="fw-bold mb-1 text-dark" style={{ fontSize: '0.82rem' }}>Go Premium</p>
          <p className="text-muted mb-3" style={{ fontSize: '0.72rem', lineHeight: '1.3' }}>Unlock higher earning rates and instant withdraw cycles.</p>
          <button 
            className="btn btn-sm w-100 fw-bold py-1.5 text-white"
            style={{ backgroundColor: '#7c3aed', borderRadius: '8px', fontSize: '0.78rem' }}
          >
            Upgrade Now
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;