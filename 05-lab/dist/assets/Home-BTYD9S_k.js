import { r, S as a, j as e, L as o } from './index-DB2OPs3R.js'
/* empty css                  */ import { S as n } from './StatsPanel-DCImY-AU.js'
const l = () => {
  const { stats: t, isLoading: s } = r.useContext(a)
  return s
    ? e.jsx('div', {
        className: 'loading-screen',
        children: e.jsx('div', { className: 'spinner' }),
      })
    : e.jsxs('div', {
        className: 'home-page dashboard',
        children: [
          e.jsxs('header', {
            className: 'dashboard-header',
            style: { textAlign: 'center', marginBottom: '50px' },
            children: [
              e.jsx('h1', {
                style: { fontSize: '3rem', marginBottom: '20px' },
                children: 'Welcome',
              }),
              e.jsx('p', {
                style: {
                  color: 'var(--text-secondary)',
                  fontSize: '1.2rem',
                  maxWidth: '600px',
                  margin: '0 auto',
                },
                children:
                  'Centralized control center for your infrastructure, development projects, and personal services.',
              }),
            ],
          }),
          e.jsx(n, {
            totalServices: t.total,
            activeCount: t.active,
            sslCount: t.ssl,
            categoriesCount: t.categories,
          }),
          e.jsx('div', {
            style: {
              display: 'flex',
              justifyContent: 'center',
              marginTop: '50px',
            },
            children: e.jsx(o, {
              to: '/dashboard',
              className: 'add-btn',
              style: {
                textDecoration: 'none',
                padding: '15px 30px',
                fontSize: '1.1rem',
              },
              children: 'Go to Dashboard →',
            }),
          }),
        ],
      })
}
export { l as default }
