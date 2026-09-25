// src/components/HeroSection.jsx
import React from 'react';
import { Play } from 'lucide-react';

const HeroSection = () => {
  const currentVes = 96;
  const targetVes = 150;
  const progressPercent = (currentVes / targetVes) * 100;

  return (
    <div 
      className="p-4 rounded-4 text-white d-flex flex-column flex-md-row justify-content-between align-items-md-center position-relative overflow-hidden mb-4 border border-secondary border-opacity-25 shadow"
      style={{ 
        background: 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)',
      }}
    >
      {/* Text Info Left Block */}
      <div className="z-1 flex-grow-1 me-md-4" style={{ maxWidth: '600px' }}>
        <h1 className="fw-extrabold display-6 mb-2 tracking-tight">
          Earn VEs, <span className="text-warning">Real Rewards</span>
        </h1>
        <p className="text-secondary mb-4 fs-6 lh-base">
          Watch short advertisements and earn VEs. Convert VEs into real cash and withdraw directly to your linked bank account.
        </p>
        
        {/* Progress Container */}
        <div className="p-3 bg-dark bg-opacity-40 rounded-3 border border-secondary border-opacity-10">
          <div className="d-flex justify-content-between align-items-center mb-2 small text-light">
            <span className="fw-semibold">Daily Earnings Progress</span>
            <span className="fw-bold text-warning">{currentVes} / {targetVes} VEs</span>
          </div>
          <div className="progress bg-secondary bg-opacity-20 rounded-pill" style={{ height: '8px' }}>
            <div 
              className="progress-bar bg-warning rounded-pill" 
              role="progressbar" 
              style={{ width: `${progressPercent}%`, transition: 'width 1s ease-in-out' }}
            ></div>
          </div>
          <p className="small text-muted mt-2 mb-0">Keep going! You're so close to your daily goal.</p>
        </div>
      </div>

      {/* Decorative Floating Graphic Right Block */}
      <div className="d-none d-md-flex align-items-center justify-content-center ms-auto position-relative" style={{ width: '180px', height: '180px' }}>
        <div className="position-absolute w-100 h-100 rounded-circle bg-warning opacity-10 blur-md"></div>
        <div 
          className="rounded-circle bg-primary bg-opacity-20 d-flex align-items-center justify-content-center shadow border border-warning border-opacity-25" 
          style={{ width: '120px', height: '120px', borderStyle: 'dashed' }}
        >
          <div className="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center shadow-lg" style={{ width: '70px', height: '70px' }}>
            <Play fill="currentColor" size={28} className="ms-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;