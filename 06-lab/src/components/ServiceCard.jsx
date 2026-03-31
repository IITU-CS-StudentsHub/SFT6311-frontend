import React from 'react'
import './ServiceCard.css'

/* Task 7: React.memo prevents re-renders when props haven't changed */
const ServiceCard = React.memo(
  ({ service, onToggleStatus, onDelete, onEdit }) => {
    const { id, title, category, url, status, ssl, description, tags } = service

    return (
      /* Task 12: unique key is applied at the parent level via service.id */
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
          <div className="card-actions">
            {onEdit && (
              <button
                className="edit-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit(service)
                }}
                title="Edit Service"
              >
                ✎
              </button>
            )}
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(id)
              }}
              title="Delete Service"
            >
              &times;
            </button>
          </div>
        </div>

        <div className="card-body">
          <h3 className="service-title">{title}</h3>
          <p className="service-category">{category}</p>
          {description && <p className="service-description">{description}</p>}
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
          {tags && tags.length > 0 && (
            <div className="card-tags">
              {tags.map((tag) => (
                <span key={tag} className="card-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  },
)

ServiceCard.displayName = 'ServiceCard'

export default ServiceCard
