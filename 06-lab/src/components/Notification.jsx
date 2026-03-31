import React, { useContext } from 'react'
import { NotificationContext } from '../context/NotificationContext'
import './Notification.css'

const Notification = React.memo(() => {
  const { notifications, removeNotification } = useContext(NotificationContext)

  if (notifications.length === 0) return null

  return (
    <div className="notification-container">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`notification notification-${notif.type}`}
        >
          <span className="notification-message">{notif.message}</span>
          <button
            className="notification-close"
            onClick={() => removeNotification(notif.id)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  )
})

Notification.displayName = 'Notification'

export default Notification
