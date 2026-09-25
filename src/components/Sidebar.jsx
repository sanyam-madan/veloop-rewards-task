// src/components/Sidebar.jsx
import React from 'react';
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
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { icon: <PlaySquare size={20} />, label: 'Watch Ads', active: true },
    { icon: <Award size={20} />, label: 'Rewards' },
    { icon: <Wallet size={20} />, label: 'Wallet' },
    { icon: <History size={20} />, label: 'History' },
    { icon: <User size={20} />, label: 'Profile' },
    { icon: <Settings size={20} />, label: 'Settings' },
    { icon: <HelpCircle size={20} />, label: 'Help & Support' }
  ];

  return (
    <aside className="p-3 bg-dark text-white vh-100 border-end border-secondary flex-shrink-0" style={{ width: '260px' }}>
      <div className="d-flex align-items-center mb-4 px-2">
        <span className="fw-bold fs-4 text-warning">VELOOP</span>
      </div>
      
      <ul className="nav nav-pills flex-column mb-auto gap-2">
        {menuItems.map((item, index) => (
          <li key={index} className="nav-item">
            <a 
              href="#" 
              className={`nav-link text-white d-flex align-items-center gap-3 py-2.5 px-3 rounded ${
                item.active ? 'bg-primary text-white' : 'hover-opacity'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
      
      <div className="mt-5 p-3 rounded bg-secondary bg-opacity-25 text-center">
        <p className="small mb-2 text-secondary">Go Premium</p>
        <button className="btn btn-sm btn-outline-warning w-100">Upgrade Now →</button>
      </div>
    </aside>
  );
};

export default Sidebar;