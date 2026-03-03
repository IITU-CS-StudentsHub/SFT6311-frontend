import { createContext, useEffect, useMemo, useState } from 'react';

export const ServiceContext = createContext();

const INITIAL_SERVICES = [
  // Infrastructure
  { id: 1, title: "cAdivisor", category: "Infrastructure", url: "cadvisor.internal.novitech.dev", status: "online", ssl: true, createdAt: Date.now() },
  { id: 2, title: "Grafana", category: "Infrastructure", url: "grafana.internal.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 100000 },
  { id: 3, title: "Nginx Proxy Manager", category: "Infrastructure", url: "nginx.internal.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 200000 },
  { id: 4, title: "Portainer", category: "Infrastructure", url: "portainer.internal.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 300000 },
  { id: 5, title: "Prometheus", category: "Infrastructure", url: "prometheus.internal.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 400000 },
  { id: 6, title: "Vault", category: "Infrastructure", url: "vault.internal.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 500000 },

  // Development
  { id: 7, title: "ChatApp API", category: "Dev", url: "chatapp-api.novitech.dev", status: "online", ssl: false, createdAt: Date.now() - 600000 },
  { id: 8, title: "ChatApp Frontend", category: "Dev", url: "chatapp.novitech.dev", status: "online", ssl: false, createdAt: Date.now() - 700000 },
  { id: 9, title: "Iceberg CRM", category: "Dev", url: "id.iceberg-crm.internal.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 800000 },
  { id: 10, title: "Qoldai", category: "Dev", url: "qoldai.novitech.dev", status: "online", ssl: false, createdAt: Date.now() - 900000 },
  { id: 11, title: "TrueSearch", category: "Dev", url: "truesearch.novitech.dev", status: "online", ssl: false, createdAt: Date.now() - 1000000 },
  { id: 12, title: "CEO Dashboard", category: "Dev", url: "ceo.novitech.dev", status: "online", ssl: false, createdAt: Date.now() - 1100000 },

  // Media & Personal
  { id: 13, title: "Immich", category: "Media", url: "immich.internal.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 1200000 },
  { id: 14, title: "Jellyfin", category: "Media", url: "jellyfin.internal.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 1300000 },
  { id: 15, title: "Minecraft Server", category: "Personal", url: "play.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 1400000 },
  { id: 16, title: "Birthday Project", category: "Personal", url: "iloveyou.novitech.dev", status: "online", ssl: false, createdAt: Date.now() - 1500000 },
  { id: 17, title: "Google Meet", category: "Personal", url: "meet.novitech.dev", status: "online", ssl: true, createdAt: Date.now() - 1600000 },
  { id: 18, title: "Earth App", category: "Personal", url: "earth.novitech.dev", status: "online", ssl: false, createdAt: Date.now() - 1700000 },
  { id: 19, title: "Fire Suppression", category: "Personal", url: "fire.novitech.dev", status: "online", ssl: false, createdAt: Date.now() - 1800000 },
];

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

    const timer = setTimeout(loadData, 1000)
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('novitech_services', JSON.stringify(services));
    }
  }, [services, isLoading]);

  const addService = (newService) => {
    const service = {
      ...newService,
      id: Date.now(),
      status: 'offline',
      createdAt: Date.now()
    };
    setServices(prev => [service, ...prev]);
  };

  const deleteService = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(prev => prev.filter(s => s.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setServices(prev => prev.map(s =>
      s.id === id ? { ...s, status: s.status === 'online' ? 'offline' : 'online' } : s
    ));
  };

  const stats = useMemo(() => ({
    total: services.length,
    active: services.filter(s => s.status === 'online').length,
    ssl: services.filter(s => s.ssl).length
  }), [services]);

  const value = {
    services,
    isLoading,
    addService,
    deleteService,
    toggleStatus,
    stats
  };

  return (
    <ServiceContext.Provider value={value}>
      {children}
    </ServiceContext.Provider>
  );
};
