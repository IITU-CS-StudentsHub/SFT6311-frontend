import { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../components/Dashboard.css';
import StatsPanel from '../components/StatsPanel';
import { ServiceContext } from '../context/ServiceContext';

const Home = () => {
    const { stats, isLoading } = useContext(ServiceContext);

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="home-page dashboard">
            <header className="dashboard-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Welcome</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    Centralized control center for your infrastructure, development projects, and personal services.
                </p>
            </header>

            <StatsPanel
                totalServices={stats.total}
                activeCount={stats.active}
                sslCount={stats.ssl}
            />

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                <Link to="/dashboard" className="add-btn" style={{ textDecoration: 'none', padding: '15px 30px', fontSize: '1.1rem' }}>
                    Go to Dashboard &rarr;
                </Link>
            </div>
        </div>
    );
};

export default Home;
