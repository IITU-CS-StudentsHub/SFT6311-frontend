import { useEffect, useState } from 'react';
import AddServiceModal from './AddServiceModal';
import './Dashboard.css';
import FilterBar from './FilterBar';
import ServiceCard from './ServiceCard';
import StatsPanel from './StatsPanel';

const INITIAL_SERVICES = [
    // Infrastructure
    { id: 1, title: "cAdivisor", category: "Infrastructure", url: "cadvisor.internal.novitech.dev", status: "online", ssl: true, createdAt: Date.now() },
    { id: 2, title: "Grafana", category: "Infrastructure", url: "grafana.internal.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 100000 },
    { id: 3, title: "Nginx Proxy Manager", category: "Infrastructure", url: "nginx.internal.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 200000 },
    { id: 4, title: "Portainer", category: "Infrastructure", url: "portainer.internal.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 300000 },
    { id: 5, title: "Prometheus", category: "Infrastructure", url: "prometheus.internal.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 400000 },
    { id: 6, title: "Vault", category: "Infrastructure", url: "vault.internal.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 500000 },

    // Development
    { id: 7, title: "ChatApp API", category: "Dev", url: "chatapp-api.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 600000 },
    { id: 8, title: "ChatApp Frontend", category: "Dev", url: "chatapp.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 700000 },
    { id: 9, title: "Iceberg CRM", category: "Dev", url: "id.iceberg-crm.internal.novitech.dev", status: "offline", ssl: false, createdAt: Date.now() - 800000 },
    { id: 10, title: "Qoldai", category: "Dev", url: "qoldai.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 900000 },
    { id: 11, title: "TrueSearch", category: "Dev", url: "truesearch.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 1000000 },
    { id: 12, title: "CEO Dashboard", category: "Dev", url: "ceo.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 1100000 },

    // Media & Personal
    { id: 13, title: "Immich", category: "Media", url: "immich.internal.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 1200000 },
    { id: 14, title: "Jellyfin", category: "Media", url: "jellyfin.internal.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 1300000 },
    { id: 15, title: "Minecraft Server", category: "Personal", url: "play.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 1400000 },
    { id: 16, title: "Birthday Project", category: "Personal", url: "iloveyou.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 1500000 },
    { id: 17, title: "Google Meet", category: "Personal", url: "meet.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 1600000 },
    { id: 18, title: "Earth App", category: "Personal", url: "earth.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 1700000 },
    { id: 19, title: "Fire Suppression", category: "Personal", url: "fire.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 1800000 },
];

const CATEGORIES = ["Infrastructure", "Dev", "Media", "Personal"];

const Dashboard = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('date_new');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadData = () => {
            const saved = localStorage.getItem('novitech_services');
            if (saved) {
                setServices(JSON.parse(saved));
            } else {
                setServices(INITIAL_SERVICES);
            }
            setIsLoading(false);
        };

        const timer = setTimeout(loadData, 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('novitech_services', JSON.stringify(services));
        }
    }, [services, isLoading]);

    const handleAddService = (newService) => {
        const service = {
            ...newService,
            id: Date.now(),
            status: 'offline',
            createdAt: Date.now()
        };
        setServices([service, ...services]);
    };

    const handleDeleteService = (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            setServices(services.filter(s => s.id !== id));
        }
    };

    const handleToggleStatus = (id) => {
        setServices(services.map(s =>
            s.id === id ? { ...s, status: s.status === 'online' ? 'offline' : 'online' } : s
        ));
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

    const stats = {
        total: services.length,
        active: services.filter(s => s.status === 'online').length,
        ssl: services.filter(s => s.ssl).length
    };

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
                <h1>LAB 3 PART 3: Novitech Dashboard</h1>
                <button className="add-btn" onClick={() => setIsModalOpen(true)}>
                    + Add Service
                </button>
            </header>

            <StatsPanel
                totalServices={stats.total}
                activeCount={stats.active}
                sslCount={stats.ssl}
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
                    filteredServices.map(service => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onToggleStatus={handleToggleStatus}
                            onDelete={handleDeleteService}
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
