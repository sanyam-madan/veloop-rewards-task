// src/components/StatsRow.jsx
import React from 'react';
import { Eye, ShieldAlert, Award, Calendar } from 'lucide-react';

const StatsRow = () => {
  const stats = [
    { label: "Today's Earnings", value: '96 VEs', change: '+12% vs yesterday', isPositive: true, icon: <Award className="text-success" size={20} /> },
    { label: 'Lifetime Earnings', value: '12,450 VEs', change: 'All time record', isPositive: true, icon: <Calendar className="text-primary" size={20} /> },
    { label: 'Ads Watched Today', value: '5', change: '+2 vs yesterday', isPositive: true, icon: <Eye className="text-warning" size={20} /> },
    { label: 'Remaining Ads', value: '7', change: 'Start watching now!', isPositive: false, icon: <ShieldAlert className="text-danger" size={20} /> }
  ];

  return (
    <div className="row g-3 mb-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="col-100 col-sm-6 col-xl-3">
          <div className="p-3 rounded-4 bg-secondary bg-opacity-10 border border-secondary border-opacity-20 h-100 d-flex flex-column justify-content-between card-hover-effect">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="small text-secondary fw-medium">{stat.label}</span>
              <div className="p-2 rounded-3 bg-dark bg-opacity-50 border border-secondary border-opacity-10">
                {stat.icon}
              </div>
            </div>
            <div>
              <h3 className="fw-bold text-white mb-1 tracking-tight">{stat.value}</h3>
              <span className={`small ${stat.label === 'Remaining Ads' ? 'text-warning' : 'text-success'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsRow;