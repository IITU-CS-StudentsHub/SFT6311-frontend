import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  INITIAL_SERVICES,
  SERVICES_LOCAL_STORAGE_KEY,
} from '../config/service.config'
import { ServiceContext } from '../context/ServiceContext'
import { migrateService } from '../utils/migrateService.util'
import { saveToLocalStorage } from '../utils/saveToLocalStorage.util'

const STATUS = {
  ONLINE: 'offline',
  OFFLINE: 'online',
}

const TOGGLE_STATUS = {
  [STATUS.ONLINE]: STATUS.OFFLINE,
  [STATUS.OFFLINE]: STATUS.ONLINE,
}

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = () => {
      const saved = localStorage.getItem('novitech_services')
      if (saved) {
        setServices(JSON.parse(saved).map(migrateService))
      } else {
        setServices(INITIAL_SERVICES)
      }
      setIsLoading(false)
    }

    const timer = setTimeout(loadData, 800)
    return () => clearTimeout(timer)
  }, [])

  const updateAndSave = useCallback((updateFn) => {
    setServices((prev) => {
      const updated = updateFn(prev)

      saveToLocalStorage(SERVICES_LOCAL_STORAGE_KEY, updated)

      return updated
    })
  }, [])

  /* task 9: useCallback for all handler functions */
  const addService = useCallback(
    (newService) => {
      updateAndSave((prev) => [
        {
          ...newService,
          id: Date.now(),
          status: 'offline',
          createdAt: Date.now(),
        },
        ...prev,
      ])
    },
    [updateAndSave],
  )

  /* task 4: edit service through form */
  const editService = useCallback(
    (id, updatedData) => {
      updateAndSave((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updatedData } : s)),
      )
    },
    [updateAndSave],
  )

  const deleteService = useCallback(
    (id) => {
      updateAndSave((prev) => prev.filter((s) => s.id !== id))
    },
    [updateAndSave],
  )

  const toggleStatus = useCallback(
    (id) => {
      updateAndSave((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, status: TOGGLE_STATUS[s.status] } : s,
        ),
      )
    },
    [updateAndSave],
  )

  /* task 8: useMemo for computed stats */
  const stats = useMemo(
    () => ({
      total: services.length,
      active: services.filter((s) => s.status === 'online').length,
      ssl: services.filter((s) => s.ssl).length,
      categories: new Set(services.map((s) => s.category)).size,
    }),
    [services],
  )

  /* task 11: memoized context value to reduce re-renders */
  const value = useMemo(
    () => ({
      services,
      isLoading,
      addService,
      editService,
      deleteService,
      toggleStatus,
      stats,
    }),
    [
      services,
      isLoading,
      addService,
      editService,
      deleteService,
      toggleStatus,
      stats,
    ],
  )

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  )
}
