import { j as e } from './index-DB2OPs3R.js'
/* empty css                  */ const o = () =>
  e.jsxs('div', {
    className: 'profile-page glass-panel',
    style: { maxWidth: '800px', margin: '0 auto', padding: '40px' },
    children: [
      e.jsxs('div', {
        className: 'profile-header',
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '30px',
          marginBottom: '40px',
        },
        children: [
          e.jsx('div', {
            className: 'profile-avatar',
            children: e.jsx('img', {
              src: 'https://avatars.githubusercontent.com/u/144257965?v=4',
              style: {
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: 'var(--card-bg)',
                border: '4px solid var(--accent-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
              },
            }),
          }),
          e.jsxs('div', {
            children: [
              e.jsx('h1', {
                style: { margin: 0, fontSize: '2.5rem' },
                children: 'Maxim Novikov',
              }),
              e.jsx('p', {
                style: {
                  color: 'var(--accent-color)',
                  fontSize: '1.2rem',
                  marginTop: '5px',
                },
                children: 'FullStack TypeScript Developer & System Architect',
              }),
            ],
          }),
        ],
      }),
      e.jsxs('div', {
        className: 'profile-details',
        children: [
          e.jsxs('section', {
            style: { marginBottom: '30px' },
            children: [
              e.jsx('h2', {
                style: {
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '10px',
                  marginBottom: '20px',
                },
                children: 'About Me',
              }),
              e.jsx('p', {
                style: { color: 'var(--text-secondary)', lineHeight: '1.6' },
                children:
                  'Passionate software engineer with a focus on self-hosted infrastructure and automation. Currently studying at IITU and building the own ecosystem. I love orchestrating containers, managing servers, and optimizing workflows ;)',
              }),
            ],
          }),
          e.jsxs('section', {
            children: [
              e.jsx('h2', {
                style: {
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '10px',
                  marginBottom: '20px',
                },
                children: 'Contact & Links',
              }),
              e.jsxs('ul', {
                style: { listStyle: 'none', padding: 0 },
                children: [
                  e.jsxs('li', {
                    style: { marginBottom: '15px' },
                    children: [
                      e.jsx('strong', { children: 'GitHub:' }),
                      ' ',
                      e.jsx('a', {
                        href: 'https://github.com/novihub',
                        target: '_blank',
                        style: {
                          color: 'var(--accent-color)',
                          textDecoration: 'none',
                        },
                        children: '@novihub',
                      }),
                    ],
                  }),
                  e.jsxs('li', {
                    style: { marginBottom: '15px' },
                    children: [
                      e.jsx('strong', { children: 'Email:' }),
                      ' ',
                      e.jsx('a', {
                        href: 'mailto:max@novitech.dev',
                        style: {
                          color: 'var(--accent-color)',
                          textDecoration: 'none',
                        },
                        children: 'max@novitech.dev',
                      }),
                    ],
                  }),
                  e.jsxs('li', {
                    style: { marginBottom: '15px' },
                    children: [
                      e.jsx('strong', { children: 'University:' }),
                      ' International IT University (IITU)',
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  })
export { o as default }
