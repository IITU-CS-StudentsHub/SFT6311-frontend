import { R as o, r as l, j as s } from './index-DB2OPs3R.js'
const x = o.memo(
  ({ totalServices: c, activeCount: r, sslCount: d, categoriesCount: i }) => {
    const [a, n] = l.useState(1e4)
    l.useEffect(() => {
      const t = setInterval(() => {
        n((e) => e + 1)
      }, 1e3)
      return () => clearInterval(t)
    }, [])
    const m = l.useMemo(() => {
      const t = Math.floor(a / 3600),
        e = Math.floor((a % 3600) / 60),
        v = a % 60
      return `${t.toString().padStart(2, '0')}:${e.toString().padStart(2, '0')}:${v.toString().padStart(2, '0')}`
    }, [a])
    return s.jsxs('div', {
      className: 'stats-panel',
      children: [
        s.jsxs('div', {
          className: 'stat-card glass-panel',
          children: [
            s.jsx('div', {
              className: 'stat-title',
              children: 'Total Services',
            }),
            s.jsx('div', { className: 'stat-value', children: c }),
          ],
        }),
        s.jsxs('div', {
          className: 'stat-card glass-panel',
          children: [
            s.jsx('div', { className: 'stat-title', children: 'Active Now' }),
            s.jsx('div', { className: 'stat-value active', children: r }),
          ],
        }),
        s.jsxs('div', {
          className: 'stat-card glass-panel',
          children: [
            s.jsx('div', { className: 'stat-title', children: 'SSL Secured' }),
            s.jsx('div', { className: 'stat-value secure', children: d }),
          ],
        }),
        i !== void 0 &&
          s.jsxs('div', {
            className: 'stat-card glass-panel',
            children: [
              s.jsx('div', { className: 'stat-title', children: 'Categories' }),
              s.jsx('div', { className: 'stat-value', children: i }),
            ],
          }),
        s.jsxs('div', {
          className: 'stat-card glass-panel uptime-card',
          children: [
            s.jsx('div', {
              className: 'stat-title',
              children: 'System Uptime',
            }),
            s.jsx('div', { className: 'stat-value uptime', children: m }),
          ],
        }),
      ],
    })
  },
)
x.displayName = 'StatsPanel'
export { x as S }
