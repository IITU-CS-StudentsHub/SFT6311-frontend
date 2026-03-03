import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({ service, onToggleStatus, onDelete }) => {
    const { id, title, category, url, status, ssl } = service;
    const isOnline = status === 'online';

    return (
        <div className={`service-card glass-panel ${status}`}>
            <div className="card-header">
                <div className="status-indicator">
                    <span
                        className={`status-dot ${status}`}
                        onClick={() => onToggleStatus(id)}
                        title={`Click to toggle status (Current: ${status})`}
                    ></span>
                    <span className="status-text">{status}</span>
                </div>
                <button
                    className="delete-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(id);
                    }}
                    title="Delete Service"
                >
                    &times;
                </button>
            </div>

            <div className="card-body">
                <h3 className="service-title">{title}</h3>
                <p className="service-category">{category}</p>
                <a
                    href={`https://${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-url"
                >
                    {url}
                </a>
            </div>

            <div className="card-footer">
                <div className={`ssl-badge ${ssl ? 'secure' : 'insecure'}`}>
                    {ssl ? 'SSL Secured' : 'No SSL'}
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
