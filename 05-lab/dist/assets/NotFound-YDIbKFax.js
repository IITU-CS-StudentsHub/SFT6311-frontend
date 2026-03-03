import { j as e, L as o } from './index-DB2OPs3R.js'
/* empty css                  */ const n = () =>
  e.jsxs('div', {
    className: 'not-found-page',
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '70vh',
      textAlign: 'center',
    },
    children: [
      e.jsx('div', {
        className: 'error-code',
        style: {
          fontSize: '8rem',
          fontWeight: '900',
          color: 'var(--error-color)',
          textShadow: '0 0 20px rgba(247, 118, 142, 0.4)',
        },
        children: '404',
      }),
      e.jsx('h2', {
        style: { fontSize: '2rem', marginBottom: '20px' },
        children: 'System Malfunction',
      }),
      e.jsxs('p', {
        style: {
          color: 'var(--text-secondary)',
          marginBottom: '40px',
          fontFamily: 'monospace',
        },
        children: [
          '> Error: Destination unreachable.',
          e.jsx('br', {}),
          '> The requested resource could not be located in the current sector.',
        ],
      }),
      e.jsx(o, {
        to: '/',
        className: 'add-btn',
        style: {
          textDecoration: 'none',
          padding: '12px 25px',
          backgroundColor: 'var(--bg-color)',
          border: '1px solid var(--accent-color)',
          color: 'var(--accent-color)',
        },
        children: 'Return to Base',
      }),
    ],
  })
export { n as default }
