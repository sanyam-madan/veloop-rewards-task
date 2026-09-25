// src/pages/WatchAds.jsx

import heroGraphicImg from '../assets/hero-graphic.png';

import { useState } from 'react';
import { Award, Calendar, Eye, ShieldAlert, Play, CheckCircle, Loader2, Flame, Gift, ArrowRight, ShieldCheck } from 'lucide-react';
import styles from '../styles/WatchAds.module.css';
import { availableAdsData, userInitialStats } from '../utils/mockdata.js';

const WatchAds = () => {
  const [userStats, setUserStats] = useState(userInitialStats);
  const [ads, setAds] = useState(availableAdsData);
  const [watchingAdId, setWatchingAdId] = useState(null);
  const [countdown, setCountdown] = useState(0);

  const [historyFeed, setHistoryFeed] = useState([
    { title: 'FinVerse Pro', reward: 38 },
    { title: 'StrideX', reward: 25 },
    { title: 'DriveEZ', reward: 20 },
  ]);

  // Clean vector image links matching the exact categories in the mockup
  const mockImages = {
    1: "https://unsplash.com", // Fintech vector feel
    2: "https://unsplash.com", // StrideX Shoe image matching mock
    3: "https://unsplash.com", // Headphones matching mock
    4: "https://unsplash.com", // Car ride-share mock
    5: "https://unsplash.com", // Security shield mock
    6: "https://unsplash.com"  // Gift retail box mock
  };

   // 🚀 FIXED: Added an explicit execution lock to stop double reward triggers
  const handleWatchAd = (adId, rewardAmount, duration) => {
    setWatchingAdId(adId);
    setCountdown(duration);
    
    // A flag tracked inside this click thread memory scope to prevent double execution
    let rewardIsProcessed = false;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          
          // CRITICAL STEP: Only add the reward if it hasn't been added yet
          if (!rewardIsProcessed) {
            rewardIsProcessed = true; // Instantly lock it down

            setUserStats(prevStats => ({
              ...prevStats,
              totalVes: prevStats.totalVes + rewardAmount,
              todaysEarnings: prevStats.todaysEarnings + rewardAmount,
              adsWatchedToday: prevStats.adsWatchedToday + 1,
              remainingAds: Math.max(0, prevStats.remainingAds - 1)
            }));

            setAds(prevAds => 
              prevAds.map(ad => ad.id === adId ? { ...ad, status: 'Completed' } : ad)
            );

            const targetedAd = ads.find(a => a.id === adId);
            if (targetedAd) {
              setHistoryFeed(prev => [{ title: targetedAd.title, reward: rewardAmount }, ...prev.slice(0, 2)]);
            }
          }
          
          setWatchingAdId(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };


  const stats = [
    { label: "Today's Earnings", value: `${userStats.todaysEarnings} VEs`, change: '+12% vs yesterday', color: '#10b981', icon: <Award size={16} className="text-success" /> },
    { label: 'Lifetime Earnings', value: `${userStats.totalVes.toLocaleString()} VEs`, change: 'All time', color: '#64748b', icon: <Calendar size={16} className="text-warning" /> },
    { label: 'Ads Watched Today', value: userStats.adsWatchedToday.toString(), change: '+2 vs yesterday', color: '#10b981', icon: <Eye size={16} className="text-primary" /> },
    { label: 'Remaining Ads', value: userStats.remainingAds.toString(), change: 'Start watching now!', color: '#3b82f6', icon: <ShieldAlert size={16} className="text-info" /> }
  ];

  const isGoalAchieved = userStats.todaysEarnings >= userStats.dailyGoal;
  const dailyProgressPercent = Math.min(100, (userStats.todaysEarnings / userStats.dailyGoal) * 100);

  const weekDays = [
    { label: 'M', dayIndex: 1 },
    { label: 'T', dayIndex: 2 },
    { label: 'W', dayIndex: 3 },
    { label: 'T', dayIndex: 4 },
    { label: 'F', dayIndex: 5 },
    { label: 'S', dayIndex: 6 },
    { label: 'S', dayIndex: 0 }
  ];

  const currentDayIndex = new Date().getDay();

  return (
    <div className={styles.pageWrapper}>
      {/* Top Navbar Row */}
      <div className={styles.headerContainer}>
        <div>
          <h2 className="fw-bold m-0 text-dark" style={{ letterSpacing: '-0.5px' }}>Watch Ads</h2>
          <small className="text-muted">Watch ads and earn VEs</small>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span className="badge bg-warning text-dark px-3 py-2 fs-6 rounded-pill fw-bold shadow-sm">
            {userStats.totalVes.toLocaleString()} VEs
          </span>
          <div className="bg-light text-dark rounded-circle d-flex align-items-center justify-content-center fw-bold border" style={{ width: '40px', height: '40px' }}>
            SM
          </div>
        </div>
      </div>

      {/* Modern High-End Hero Section */}
      <div className={styles.heroBanner}>
        <div className={styles.heroText}>
          <h1>Earn VEs, Real Rewards</h1>
          <p className={styles.heroSubtitle}>
            Watch short advertisements and earn VEs. Convert VEs into real cash and withdraw directly to your linked bank account.
          </p>
          
          <div className={styles.progressContainer}>
            <div className="d-flex justify-content-between align-items-center mb-1 text-dark fs-6">
              <span className="fw-semibold text-muted small">Daily Earnings Progress</span>
              <span className="fw-bold text-dark small">{userStats.todaysEarnings} / {userStats.dailyGoal} VEs</span>
            </div>
            <div className="progress bg-light rounded-pill" style={{ height: '6px' }}>
              <div 
                className="progress-bar bg-purple rounded-pill" 
                style={{ width: `${dailyProgressPercent}%`, backgroundColor: '#7c3aed', transition: 'width 0.4s ease' }}
              ></div>
            </div>
            <p className="small mt-1.5 mb-0 fw-medium" style={{ fontSize: '0.72rem', color: isGoalAchieved ? '#10b981' : '#64748b' }}>
              {isGoalAchieved 
                ? '🎉 Daily Goal Achieved! Keep watching for extra bonus earnings.' 
                : "Keep going! You're so close to your daily goal."}
            </p>
          </div>
          
        </div>
        <div className={styles.heroGraphicWrapper}>
          <img 
            src={heroGraphicImg} 
            alt="Rewards Graphic" 
            style={{ 
              width: '100%', 
              height: '135%', 
              objectFit: 'cover',
               mixBlendMode: 'darken' 
            }} 
          />
        </div>

       
      </div>

      {/* Grid Layout Row for Analytics Cards */}
      <div className={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <div key={idx} className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>{stat.label}</span>
              <div className={styles.statIconBox}>{stat.icon}</div>
            </div>
            <div>
              <div className={styles.statValue}>{stat.value}</div>
              <span className={styles.statTrend} style={{ color: stat.color }}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* MIDDLE GREEN SECURITY BANNER FROM THE MOCKUP */}
      <div className={styles.infoAlertBar}>
        <div className="d-flex align-items-center justify-content-between w-100 px-2">
          <div className="d-flex align-items-center gap-3">
            <ShieldCheck size={20} className="text-success" />
            <div>
              <strong className="text-dark small d-block">Your VEs. Your Rewards.</strong>
              <span className="text-muted" style={{ fontSize: '0.78rem' }}>Earn VEs by watching ads. Convert them into real cash and withdraw to your linked bank account once you meet conditions.</span>
            </div>
          </div>
          <button className="btn btn-sm btn-light border bg-white fw-bold px-3 py-1 text-dark" style={{ fontSize: '0.78rem' }}>Learn More</button>
        </div>
      </div>

      {/* AVAILABLE ADS SECTIONS */}
      <div className={styles.adsGridHeader}>
        <h5 className="fw-bold m-0 text-dark">Available Ads</h5>
        <span className="text-muted small">{ads.filter(a => a.status === 'Available').length} Ads Available</span>
      </div>

      <div className={styles.adsCardGrid}>
        {ads.map((ad) => {
          const isThisAdWatching = watchingAdId === ad.id;
          const isAnyAdWatching = watchingAdId !== null;
          const isCompleted = ad.status === 'Completed';

          return (
            <div key={ad.id} className={styles.adCard}>
              <div className={styles.adImageWrapper}>
                <span className={styles.categoryBadge}>{ad.category}</span>
                <img src={mockImages[ad.id]} alt="" className={styles.adImage} />
              </div>
              
              <div className={styles.adBody}>
                <h5 className={styles.adTitle}>{ad.title}</h5>
                <p className={styles.adDesc}>{ad.description}</p>
                
                <div className={styles.adMeta}>
                  <span className="small text-muted">🕒 {ad.duration} sec</span>
                  <span className={styles.rewardText}>+{ad.reward} VEs</span>
                </div>

                <button 
                  className={styles.adButton}
                  onClick={() => handleWatchAd(ad.id, ad.reward, ad.duration)}
                  disabled={isCompleted || (isAnyAdWatching && !isThisAdWatching)}
                  style={{ backgroundColor: isCompleted ? '#f1f5f9' : '#7c3aed' }}
                >
                  {isThisAdWatching ? (
                    <>
                      <Loader2 size={14} className="spinner-border-sm animate-spin" />
                                            <span>Watching ({countdown}s)</span>
                    </>
                  ) : isCompleted ? (
                    <>
                      <CheckCircle size={14} className="text-muted" />
                      <span className="text-muted">Completed</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} fill="currentColor" />
                      <span>Watch Advertisement</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* SIDEBAR WIDGET PANELS ROW */}
      <div className={styles.widgetsContainer}>
        {/* Widget 1: Daily Streak */}
        <div className={styles.widgetCard}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className={styles.widgetTitle + " m-0"}>
              <Flame size={16} className="text-danger me-1 inline-block align-middle" fill="currentColor" />
              Daily Streak
            </h6>
            <span className="badge bg-danger bg-opacity-10 text-danger px-2 py-0.5 rounded">7 Days</span>
          </div>
          <p className="text-muted small mb-3" style={{ fontSize: '0.78rem' }}>Keep it up! Watch ads daily to claim a reward.</p>
          <div className={styles.streakGrid}>
            {weekDays.map((day, idx) => {
              const isToday = day.dayIndex === currentDayIndex;
              return (
                <div key={idx} className={styles.streakDay}>
                  <span className={`${styles.dayBubble} ${isToday ? styles.dayBubbleActive : ''}`}>
                    {day.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="d-flex align-items-center gap-2 mt-3 p-2 rounded bg-light border">
            <Gift size={20} className="text-warning flex-shrink-0" />
            <span className="text-muted" style={{ fontSize: '0.72rem' }}>Next mystery reward unlocks in 24 hours!</span>
          </div>
        </div>

        {/* Widget 2: Recent Earnings */}
        <div className={styles.widgetCard}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className={styles.widgetTitle + " m-0"}>Recent Earnings</h6>
            <a href="#" className="text-primary small text-decoration-none d-flex align-items-center gap-1" style={{ fontSize: '0.78rem' }}>
              View all <ArrowRight size={12} />
            </a>
          </div>
          <div className={styles.historyFeed}>
            {historyFeed.map((item, idx) => (
              <div key={idx} className={styles.historyItem}>
                <span className="small text-dark fw-medium" style={{ fontSize: '0.78rem' }}>{item.title}</span>
                <span className="small text-success fw-bold" style={{ fontSize: '0.78rem' }}>+{item.reward} VEs</span>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 3: Weekly Progress Custom Chart */}
        <div className={styles.widgetCard}>
          <h6 className={styles.widgetTitle}>Weekly Earnings</h6>
          <div className={styles.chartContainer}>
            {userStats.weeklyProgress.map((prog, idx) => {
              const calculatedHeight = Math.min(80, (prog.ves / 300) * 80);
              return (
                <div key={idx} className={styles.chartColumnWrapper}>
                  <div className={styles.chartBar} style={{ height: `${calculatedHeight}px`, backgroundColor: '#7c3aed' }}></div>
                  <span className={styles.dayLabel}>{prog.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS PROCESS FLOW SECTION */}
      <div className={styles.howItWorksCard}>
        <h6 className={styles.widgetTitle + " mb-3"}>How It Works</h6>
        <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center justify-content-between gap-3">
          <div className={styles.stepItem}>
            <div className={styles.stepNumber} style={{ backgroundColor: '#f3e8ff', color: '#7c3aed' }}>1</div>
            <div className={styles.stepContent}>
              <h6>Watch</h6>
              <p>Watch short ads completely.</p>
            </div>
          </div>
          <div className={styles.stepItem}>
            <div className={styles.stepNumber} style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>2</div>
            <div className={styles.stepContent}>
              <h6>Earn</h6>
              <p>Earn VEs instantly.</p>
            </div>
          </div>
          <div className={styles.stepItem}>
            <div className={styles.stepNumber} style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>3</div>
            <div className={styles.stepContent}>
              <h6>Withdraw</h6>
              <p>Convert VEs to real cash.</p>
            </div>
          </div>
          <button className={styles.walletBtn}>View My Wallet →</button>
        </div>
      </div>

      {/* FOOTER SECTION */}
      <div className={styles.footerContainer}>
        <p className="text-muted small m-0" style={{ fontSize: '0.72rem' }}>
          &copy; 2025 VELOOP Rewards. All rights reserved.
        </p>
      </div>

    </div>
  );
};

export default WatchAds;

