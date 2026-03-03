import { useCallback, useContext, useMemo, useState } from 'react'
import AddServiceModal from '../components/AddServiceModal'
import '../components/Dashboard.css'
import EditServiceModal from '../components/EditServiceModal'
import FilterBar from '../components/FilterBar'
import ServiceCard from '../components/ServiceCard'
import StatsPanel from '../components/StatsPanel'
import { FilterContext } from '../context/FilterContext'
import { NotificationContext } from '../context/NotificationContext'
import { ServiceContext } from '../context/ServiceContext'

const CATEGORIES = ['Infrastructure', 'Dev', 'Media', 'Personal']

const DashboardPage = () => {
  const {
    services,
    isLoading,
    addService,
    editService,
    deleteService,
    toggleStatus,
    stats,
  } = useContext(ServiceContext)
  const {
    filter,
    searchQuery,
    sortOrder,
    setFilter,
    setSearchQuery,
    setSortOrder,
  } = useContext(FilterContext)
  const { addNotification } = useContext(NotificationContext)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingService, setEditingService] = useState(null)

  /* Task 9: useCallback to prevent function re-creation on each render */
  const handleAddService = useCallback(
    (newService) => {
      addService(newService)
      addNotification(
        `Service "${newService.title}" added successfully!`,
        'success',
      )
    },
    [addService, addNotification],
  )

  const handleEditService = useCallback(
    (id, updatedData) => {
      editService(id, updatedData)
      addNotification(
        `Service "${updatedData.title}" updated successfully!`,
        'success',
      )
    },
    [editService, addNotification],
  )

  const handleDeleteService = useCallback(
    (id) => {
      if (window.confirm('Are you sure you want to delete this service?')) {
        deleteService(id)
        addNotification('Service deleted.', 'info')
      }
    },
    [deleteService, addNotification],
  )

  const handleToggleStatus = useCallback(
    (id) => {
      toggleStatus(id)
    },
    [toggleStatus],
  )

  const handleOpenEdit = useCallback((service) => {
    setEditingService(service)
  }, [])

  const handleOpenAdd = useCallback(() => {
    setIsAddModalOpen(true)
  }, [])

  const handleCloseAdd = useCallback(() => {
    setIsAddModalOpen(false)
  }, [])

  const handleCloseEdit = useCallback(() => {
    setEditingService(null)
  }, [])

  /* Task 8: useMemo for filtered and sorted services */
  const filteredServices = useMemo(() => {
    return services
      .filter((s) => {
        const matchesCategory = filter === 'All' || s.category === filter
        const matchesSearch =
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.url.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
      })
      .sort((a, b) => {
        switch (sortOrder) {
          case 'name_asc':
            return a.title.localeCompare(b.title)
          case 'name_desc':
            return b.title.localeCompare(a.title)
          case 'date_new':
            return b.createdAt - a.createdAt
          case 'date_old':
            return a.createdAt - b.createdAt
          default:
            return 0
        }
      })
  }, [services, filter, searchQuery, sortOrder])

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading Dashboard...</p>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button className="add-btn" onClick={handleOpenAdd}>
          + Add Service
        </button>
      </header>

      <StatsPanel
        totalServices={stats.total}
        activeCount={stats.active}
        sslCount={stats.ssl}
        categoriesCount={stats.categories}
      />

      <FilterBar
        categories={CATEGORIES}
        activeCategory={filter}
        onCategoryChange={setFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      <div className="services-grid">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            /* Task 12: unique key={service.id} for each list item */
            <ServiceCard
              key={service.id}
              service={service}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDeleteService}
              onEdit={handleOpenEdit}
            />
          ))
        ) : (
          <div className="no-results glass-panel">
            <p>No services found matching your criteria.</p>
          </div>
        )}
      </div>

      <AddServiceModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAdd}
        onAdd={handleAddService}
      />

      {/* Task 4: Edit existing service through a controlled form */}
      <EditServiceModal
        isOpen={!!editingService}
        onClose={handleCloseEdit}
        onSave={handleEditService}
        service={editingService}
      />
    </div>
  )
}

export default DashboardPage
