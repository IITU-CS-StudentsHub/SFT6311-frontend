import { useEffect, useState } from 'react';
import './StatsPanel.css';

const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const StatsPanel = ({ totalServices, activeCount, sslCount }) => {
    const [uptime, setUptime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setUptime(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

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
            <div className="stat-card glass-panel uptime-card">
                <div className="stat-title">System Uptime</div>
                <div className="stat-value uptime">{formatTime(uptime)}</div>
            </div>
        </div>
    );
};

export default StatsPanel;
