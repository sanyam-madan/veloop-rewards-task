import { 
  LayoutDashboard, 
  PlaySquare, 
  Award, 
  Wallet, 
  History, 
  User, 
  Settings, 
  HelpCircle 
} from 'lucide-react';

const Sidebar = () => {
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
    <aside 
      className="p-3 border-end flex-shrink-0 d-flex flex-column h-100" 
      style={{ 
        width: '260px', 
        backgroundColor: 'var(--bg-sidebar)', 
        borderColor: 'var(--border-light)' 
      }}
    >
      {/* Brand Branding Section */}
      <div className="d-flex align-items-center mb-4 mt-2 px-2">
        <span className="fw-bold fs-4" style={{ color: '#7c3aed', letterSpacing: '-0.5px' }}>VELOOP</span>
      </div>
      
      {/* Navigation Nav Tree Links */}
      <ul className="nav nav-pills flex-column mb-auto gap-1">
        {menuItems.map((item, index) => (
          <li key={index} className="nav-item">
            <a 
              href="#" 
              className={`nav-link d-flex align-items-center gap-3 py-2.5 px-3 rounded-3 fw-medium transition-all ${
                item.active 
                  ? 'text-white' 
                  : 'text-secondary hover-bg-light'
              }`}
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
      
      {/* Onboarding Bottom Callout Box */}
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
  );
};

export default Sidebar;