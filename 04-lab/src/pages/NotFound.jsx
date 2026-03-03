import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Dashboard.css';

const NotFound = () => {
    return (
        <div className="not-found-page" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh',
            textAlign: 'center'
        }}>
            <div className="error-code" style={{
                fontSize: '8rem',
                fontWeight: '900',
                color: 'var(--error-color)',
                textShadow: '0 0 20px rgba(247, 118, 142, 0.4)'
            }}>
                404
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>System Malfunction</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontFamily: 'monospace' }}>
                &gt; Error: Destination unreachable.<br />
                &gt; The requested resource could not be located in the current sector.
            </p>

            <Link to="/" className="add-btn" style={{
                textDecoration: 'none',
                padding: '12px 25px',
                backgroundColor: 'var(--bg-color)',
                border: '1px solid var(--accent-color)',
                color: 'var(--accent-color)'
            }}>
                Return to Base
            </Link>
        </div>
    );
};

export default NotFound;
