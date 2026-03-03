import { useCallback, useMemo, useState } from 'react'
import { FilterContext } from '../context/FilterContext'

export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('date_new')

  const handleFilterChange = useCallback((cat) => setFilter(cat), [])
  const handleSearchChange = useCallback((q) => setSearchQuery(q), [])
  const handleSortChange = useCallback((order) => setSortOrder(order), [])

  const value = useMemo(
    () => ({
      filter,
      searchQuery,
      sortOrder,
      setFilter: handleFilterChange,
      setSearchQuery: handleSearchChange,
      setSortOrder: handleSortChange,
    }),
    [
      filter,
      searchQuery,
      sortOrder,
      handleFilterChange,
      handleSearchChange,
      handleSortChange,
    ],
  )

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  )
}
