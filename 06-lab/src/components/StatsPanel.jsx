import React, { useEffect, useMemo, useState } from 'react'
import './StatsPanel.css'

/* Task 7: React.memo prevents re-renders when stats don't change */
const StatsPanel = React.memo(({ totalServices, activeCount, sslCount, categoriesCount }) => {
  const [uptime, setUptime] = useState(10_000)

  useEffect(() => {
    const timer = setInterval(() => {
      setUptime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  /* Task 8: useMemo for formatted time computation */
  const formattedTime = useMemo(() => {
    const h = Math.floor(uptime / 3600)
    const m = Math.floor((uptime % 3600) / 60)
    const s = uptime % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }, [uptime])

  return (
    <div className="stats-panel">
      <div className="stat-card glass-panel">
        <div className="stat-title">Total Services</div>
        <div className="stat-value">{totalServices}</div>
      </div>
      <div className="stat-card glass-panel">
        <div className="stat-title">Active Now</div>
        <div className="stat-value active">{activeCount}</div>
      </div>
      <div className="stat-card glass-panel">
        <div className="stat-title">SSL Secured</div>
        <div className="stat-value secure">{sslCount}</div>
      </div>
      {categoriesCount !== undefined && (
        <div className="stat-card glass-panel">
          <div className="stat-title">Categories</div>
          <div className="stat-value">{categoriesCount}</div>
        </div>
      )}
      <div className="stat-card glass-panel uptime-card">
        <div className="stat-title">System Uptime</div>
        <div className="stat-value uptime">{formattedTime}</div>
      </div>
    </div>
  )
})

export default StatsPanel
