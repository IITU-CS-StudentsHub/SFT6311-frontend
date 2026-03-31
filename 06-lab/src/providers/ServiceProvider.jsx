import { useCallback, useMemo } from 'react'
import { ServiceContext } from '../context/ServiceContext'
import { useFetch } from '../hooks/useFetch'

const API_URL = 'http://localhost:3001/services'

const TOGGLE_STATUS = {
  online: 'offline',
  offline: 'online',
}

export const ServiceProvider = ({ children }) => {
  const { data: fetchedServices, loading: isLoading, error, refetch } = useFetch(API_URL)
  const services = fetchedServices || []

  const addService = useCallback(
    async (newService) => {
      const service = {
        ...newService,
        status: 'offline',
        createdAt: Date.now(),
      }
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
      })
      refetch()
    },
    [refetch],
  )

  const editService = useCallback(
    async (id, updatedData) => {
      await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      })
      refetch()
    },
    [refetch],
  )

  const deleteService = useCallback(
    async (id) => {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })
      refetch()
    },
    [refetch],
  )

  const toggleStatus = useCallback(
    async (id) => {
      const service = services.find((s) => s.id === id)
      if (!service) return
      await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: TOGGLE_STATUS[service.status] }),
      })
      refetch()
    },
    [refetch, services],
  )

  const stats = useMemo(
    () => ({
      total: services.length,
      active: services.filter((s) => s.status === 'online').length,
      ssl: services.filter((s) => s.ssl).length,
      categories: new Set(services.map((s) => s.category)).size,
    }),
    [services],
  )

  const value = useMemo(
    () => ({
      services,
      isLoading,
      error,
      addService,
      editService,
      deleteService,
      toggleStatus,
      stats,
    }),
    [services, isLoading, error, addService, editService, deleteService, toggleStatus, stats],
  )

  return (
    <ServiceContext.Provider value={value}>
      {children}
    </ServiceContext.Provider>
  )
}
