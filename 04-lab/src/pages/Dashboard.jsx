import React, { useState, useContext } from 'react';
import { ServiceContext } from '../context/ServiceContext';
import ServiceCard from '../components/ServiceCard';
import FilterBar from '../components/FilterBar';
import AddServiceModal from '../components/AddServiceModal';
import '../components/Dashboard.css';

const CATEGORIES = ["Infrastructure", "Dev", "Media", "Personal"];

const Dashboard = () => {
    const { services, isLoading, addService, deleteService, toggleStatus } = useContext(ServiceContext);

    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('date_new');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddService = (newService) => {
        addService(newService);
    };

    // derived state
    const filteredServices = services
        .filter(s => {
            const matchesCategory = filter === 'All' || s.category === filter;
            const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.url.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            switch (sortOrder) {
                case 'name_asc': return a.title.localeCompare(b.title);
                case 'name_desc': return b.title.localeCompare(a.title);
                case 'date_new': return b.createdAt - a.createdAt;
                case 'date_old': return a.createdAt - b.createdAt;
                default: return 0;
            }
        });

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Loading Novitech Dashboard...</p>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <button className="add-btn" onClick={() => setIsModalOpen(true)}>
                    + Add Service
                </button>
            </header>

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
                    filteredServices.map(service => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onToggleStatus={toggleStatus}
                            onDelete={deleteService}
                        />
                    ))
                ) : (
                    <div className="no-results glass-panel">
                        <p>No services found matching your criteria.</p>
                    </div>
                )}
            </div>

            <AddServiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddService}
            />
        </div>
    );
};

export default Dashboard;
