// src/pages/WatchAds.jsx
import { useState } from 'react';
import { Award, Calendar, Eye, ShieldAlert, Play, CheckCircle, Loader2, MonitorPlay, Flame, Gift, ArrowRight } from 'lucide-react';
import styles from '../styles/WatchAds.module.css';
import { availableAdsData, userInitialStats } from '../utils/mockData';

const WatchAds = () => {
  const [userStats, setUserStats] = useState(userInitialStats);
  const [ads, setAds] = useState(availableAdsData);
  const [watchingAdId, setWatchingAdId] = useState(null);
  const [countdown, setCountdown] = useState(0);

  // Dynamic state arrays for recent earnings history feeds
  const [historyFeed, setHistoryFeed] = useState([
    { title: 'FinVerse Pro', reward: 38 },
    { title: 'StrideX', reward: 25 },
    { title: 'DriveEZ', reward: 20 },
  ]);

  const handleWatchAd = (adId, rewardAmount, duration) => {
    setWatchingAdId(adId);
    setCountdown(duration);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          
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

          // Prepend new completion into the live activity tracking panel
          const targetedAd = ads.find(a => a.id === adId);
          if (targetedAd) {
            setHistoryFeed(prev => [{ title: targetedAd.title, reward: rewardAmount }, ...prev.slice(0, 3)]);
          }
          
          setWatchingAdId(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stats = [
    { label: "Today's Earnings", value: `${userStats.todaysEarnings} VEs`, change: '+12% vs yesterday', color: '#10b981', icon: <Award size={18} style={{ color: '#10b981' }} /> },
    { label: 'Lifetime Earnings', value: `${userStats.totalVes.toLocaleString()} VEs`, change: 'All time record', color: '#3b82f6', icon: <Calendar size={18} style={{ color: '#3b82f6' }} /> },
    { label: 'Ads Watched Today', value: userStats.adsWatchedToday.toString(), change: '+2 vs yesterday', color: '#f59e0b', icon: <Eye size={18} style={{ color: '#f59e0b' }} /> },
    { label: 'Remaining Ads', value: userStats.remainingAds.toString(), change: 'Start watching now!', color: '#ef4444', icon: <ShieldAlert size={18} style={{ color: '#ef4444' }} /> }
  ];

  const isGoalAchieved = userStats.todaysEarnings >= userStats.dailyGoal;
  const dailyProgressPercent = Math.min(100, (userStats.todaysEarnings / userStats.dailyGoal) * 100);

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className={styles.pageWrapper}>
      {/* Top Header Navbar */}
      <div className={styles.headerContainer}>
        <div>
          <h2 className="fw-bold m-0 text-white">Watch Ads</h2>
          <small className="text-muted">Watch ads and earn VEs</small>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span className="badge bg-warning text-dark px-3 py-2 fs-6 rounded-pill fw-bold">
            {userStats.totalVes.toLocaleString()} VEs
          </span>
          <div className="bg-secondary bg-opacity-30 text-white rounded-circle d-flex align-items-center justify-content-center fw-bold border border-secondary border-opacity-25" style={{ width: '40px', height: '40px' }}>
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
            <div className="d-flex justify-content-between align-items-center mb-2 text-white fs-6">
              <span className="fw-medium small">Daily Earnings Progress</span>
              <span className={`fw-bold small ${isGoalAchieved ? 'text-success' : 'text-warning'}`}>
                {userStats.todaysEarnings} / {userStats.dailyGoal} VEs
              </span>
            </div>
            <div className="progress bg-secondary bg-opacity-20 rounded-pill" style={{ height: '6px' }}>
              <div 
                className={`progress-bar rounded-pill ${isGoalAchieved ? 'bg-success' : 'bg-warning'}`} 
                style={{ width: `${dailyProgressPercent}%`, transition: 'width 0.4s ease' }}
              ></div>
            </div>
            <p className="small mt-2 mb-0 fw-medium" style={{ fontSize: '0.75rem', color: isGoalAchieved ? '#10b981' : '#9ca3af' }}>
              {isGoalAchieved 
                ? '🎉 Daily Goal Achieved! Keep watching for extra bonus earnings.' 
                : "Keep going! You're so close to your daily goal."}
            </p>
          </div>
        </div>
        <div className={styles.glowSphere}></div>
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

      {/* AVAILABLE ADS SECTIONS */}
      <div className={styles.adsGridHeader}>
        <h4 className="fw-bold m-0 text-white">Available Ads</h4>
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
                <MonitorPlay size={32} className="text-secondary opacity-20" />
              </div>
              
              <div className={styles.adBody}>
                <h5 className={styles.adTitle}>{ad.title}</h5>
                <p className={styles.adDesc}>{ad.description}</p>
                
                <div className={styles.adMeta}>
                  <span>🕒 {ad.duration} sec</span>
                  <span className={styles.rewardText}>+{ad.reward} VEs</span>
                </div>

                <button 
                  className={styles.adButton}
                  onClick={() => handleWatchAd(ad.id, ad.reward, ad.duration)}
                  disabled={isCompleted || (isAnyAdWatching && !isThisAdWatching)}
                >
                  {isThisAdWatching ? (
                    <>
                      <Loader2 size={16} className="spinner-border-sm animate-spin" />
                      <span>Watching ({countdown}s)</span>
                    </>
                  ) : isCompleted ? (
                    <>
                      <CheckCircle size={16} />
                      <span>Completed</span>
                    </>
                  ) : (
                    <>
                      <Play size={16} fill="currentColor" />
                      <span>Watch Advertisement</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* FINAL REQUIRED SIDEBAR WIDGET PANELS ROW */}
      <div className={styles.widgetsContainer}>
        {/* Widget 1: Daily Streak */}
        <div className={styles.widgetCard}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className={styles.widgetTitle + " m-0"}>
              <Flame size={18} className="text-danger me-2 inline-block align-middle" fill="currentColor" />
              Daily Streak
            </h5>
            <span className="badge bg-danger bg-opacity-10 text-danger px-2.5 py-1 rounded">7 Days</span>
          </div>
          <p className="text-muted small mb-3">Keep it up! Watch ads daily to claim a mystery box reward.</p>
          <div className={styles.streakGrid}>
            {weekDays.map((day, idx) => (
              <div key={idx} className={styles.streakDay}>
                <span className={styles.dayBubble + " " + styles.dayBubbleActive}>{day}</span>
              </div>
            ))}
          </div>
          <div className="d-flex align-items-center gap-3 mt-3 p-2.5 rounded bg-dark bg-opacity-40 border border-secondary border-opacity-10">
            <Gift size={28} className="text-warning flex-shrink-0" />
            <span className="small text-muted" style={{ fontSize: '0.75rem' }}>Next mystery reward unlocks in 24 hours!</span>
          </div>
        </div>

               {/* Widget 2: Recent Earnings */}
        <div className={styles.widgetCard}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className={styles.widgetTitle + " m-0"}>Recent Earnings</h5>
            <a href="#" className="text-primary small text-decoration-none d-flex align-items-center gap-1">
              View all <ArrowRight size={12} />
            </a>
          </div>
          
          <div className={styles.historyFeed}>
            {historyFeed.map((item, idx) => (
              <div key={idx} className={styles.historyItem}>
                <span className="small text-white fw-medium">{item.title}</span>
                <span className="small text-success fw-bold">+{item.reward} VEs</span>
              </div>
            ))}
          </div>
        </div>


      {/* Widget 3: Weekly Progress Custom Chart */}
      <div className={styles.widgetCard}>
        <h5 className={styles.widgetTitle}>Weekly Earnings</h5>
        <div className={styles.chartContainer}>
          {userStats.weeklyProgress.map((prog, idx) => {
            const calculatedHeight = Math.min(100, (prog.ves / 300) * 100);
            return (
              <div key={idx} className={styles.chartColumnWrapper}>
                <div className={styles.chartBar} style={{ height: `${calculatedHeight}px` }}></div>
                <span className={styles.dayLabel}>{prog.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>

  </div>
);
};

export default WatchAds;
