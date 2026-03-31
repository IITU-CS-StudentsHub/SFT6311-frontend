import { Suspense, lazy } from 'react'
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import './App.css'
import { LoadingFallback } from './components/LoadingFallback'
import NavBar from './components/NavBar'
import Notification from './components/Notification'
import { FilterProvider } from './providers/FilterProvider'
import { NotificationProvider } from './providers/NotificationProvider'
import { ServiceProvider } from './providers/ServiceProvider'

/* task 10: React.lazy for lazy loading pages */
const Home = lazy(() => import('./pages/Home'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Profile = lazy(() => import('./pages/Profile'))
const NotFound = lazy(() => import('./pages/NotFound'))

/* task 11: Context split into ServiceProvider, FilterProvider, NotificationProvider */
export const App = () => {
  return (
    <ServiceProvider>
      <FilterProvider>
        <NotificationProvider>
          <Router>
            <div className="app-container">
              <NavBar />
              <Notification />
              <div className="content-wrapper">
                {/* task 10: Suspense wraps lazy-loaded routes */}
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                  </Routes>
                </Suspense>
              </div>
            </div>
          </Router>
        </NotificationProvider>
      </FilterProvider>
    </ServiceProvider>
  )
}
