import { R as y, j as e, r as a, S as _, F, N as U } from './index-DB2OPs3R.js'
import { S as q } from './StatsPanel-DCImY-AU.js'
/* empty css                  */ const L = y.memo(
  ({ service: j, onToggleStatus: u, onDelete: v, onEdit: s }) => {
    const {
      id: l,
      title: n,
      category: c,
      url: r,
      status: i,
      ssl: h,
      description: m,
      tags: p,
    } = j
    return e.jsxs('div', {
      className: `service-card glass-panel ${i}`,
      children: [
        e.jsxs('div', {
          className: 'card-header',
          children: [
            e.jsxs('div', {
              className: 'status-indicator',
              children: [
                e.jsx('span', {
                  className: `status-dot ${i}`,
                  onClick: () => u(l),
                  title: `Click to toggle status (Current: ${i})`,
                }),
                e.jsx('span', { className: 'status-text', children: i }),
              ],
            }),
            e.jsxs('div', {
              className: 'card-actions',
              children: [
                s &&
                  e.jsx('button', {
                    className: 'edit-btn',
                    onClick: (x) => {
                      ;(x.stopPropagation(), s(j))
                    },
                    title: 'Edit Service',
                    children: '✎',
                  }),
                e.jsx('button', {
                  className: 'delete-btn',
                  onClick: (x) => {
                    ;(x.stopPropagation(), v(l))
                  },
                  title: 'Delete Service',
                  children: '×',
                }),
              ],
            }),
          ],
        }),
        e.jsxs('div', {
          className: 'card-body',
          children: [
            e.jsx('h3', { className: 'service-title', children: n }),
            e.jsx('p', { className: 'service-category', children: c }),
            m && e.jsx('p', { className: 'service-description', children: m }),
            e.jsx('a', {
              href: `https://${r}`,
              target: '_blank',
              rel: 'noopener noreferrer',
              className: 'service-url',
              children: r,
            }),
          ],
        }),
        e.jsxs('div', {
          className: 'card-footer',
          children: [
            e.jsx('div', {
              className: `ssl-badge ${h ? 'secure' : 'insecure'}`,
              children: h ? 'SSL Secured' : 'No SSL',
            }),
            p &&
              p.length > 0 &&
              e.jsx('div', {
                className: 'card-tags',
                children: p.map((x) =>
                  e.jsx('span', { className: 'card-tag', children: x }, x),
                ),
              }),
          ],
        }),
      ],
    })
  },
)
L.displayName = 'ServiceCard'
const $ = y.memo(
  ({
    categories: j,
    activeCategory: u,
    onCategoryChange: v,
    searchQuery: s,
    onSearchChange: l,
    sortOrder: n,
    onSortChange: c,
  }) =>
    e.jsxs('div', {
      className: 'filter-bar glass-panel',
      children: [
        e.jsx('div', {
          className: 'search-section',
          children: e.jsx('input', {
            type: 'text',
            placeholder: 'Search services...',
            value: s,
            onChange: (r) => l(r.target.value),
            className: 'search-input',
          }),
        }),
        e.jsxs('div', {
          className: 'filter-section',
          children: [
            e.jsx('button', {
              className: `filter-btn ${u === 'All' ? 'active' : ''}`,
              onClick: () => v('All'),
              children: 'All',
            }),
            j.map((r) =>
              e.jsx(
                'button',
                {
                  className: `filter-btn ${u === r ? 'active' : ''}`,
                  onClick: () => v(r),
                  children: r,
                },
                r,
              ),
            ),
          ],
        }),
        e.jsx('div', {
          className: 'sort-section',
          children: e.jsxs('select', {
            value: n,
            onChange: (r) => c(r.target.value),
            className: 'sort-select',
            children: [
              e.jsx('option', { value: 'name_asc', children: 'Name (A-Z)' }),
              e.jsx('option', { value: 'name_desc', children: 'Name (Z-A)' }),
              e.jsx('option', { value: 'date_new', children: 'Newest First' }),
              e.jsx('option', { value: 'date_old', children: 'Oldest First' }),
            ],
          }),
        }),
      ],
    }),
)
$.displayName = 'FilterBar'
const B = ['Infrastructure', 'Dev', 'Media', 'Personal'],
  V = [
    'monitoring',
    'critical',
    'public',
    'internal',
    'production',
    'development',
  ],
  k = {
    title: '',
    category: 'Infrastructure',
    url: '',
    description: '',
    ssl: !1,
    tags: [],
  },
  T = y.memo(({ isOpen: j, onClose: u, onAdd: v }) => {
    const [s, l] = a.useState(k),
      [n, c] = a.useState({}),
      r = a.useMemo(() => {
        const t = {}
        return (
          s.title.length > 0 &&
            s.title.length < 3 &&
            (t.title = 'Title is too short (min 3 characters)'),
          n.title && !s.title.trim() && (t.title = 'Title is required'),
          n.url && !s.url.trim()
            ? (t.url = 'URL is required')
            : s.url.includes(' ') && (t.url = 'URL cannot contain spaces'),
          s.description.length > 200 &&
            (t.description = `Description too long (${s.description.length}/200)`),
          t
        )
      }, [s, n]),
      i = a.useMemo(
        () => ({
          title:
            s.title.length > 0 && s.title.length < 3
              ? `${3 - s.title.length} more character(s) needed`
              : s.title.length >= 3
                ? '✓ Looks good!'
                : 'Enter at least 3 characters',
          url:
            s.url.length > 0 && !s.url.includes(' ')
              ? '✓ Valid URL format'
              : 'Example: myapp.novitech.dev',
          description: `${s.description.length}/200 characters`,
        }),
        [s],
      ),
      h = a.useMemo(
        () =>
          s.title.trim().length >= 3 &&
          s.url.trim().length > 0 &&
          !s.url.includes(' ') &&
          s.description.length <= 200,
        [s],
      )
    if (!j) return null
    const m = (t) => {
        const { name: d, value: N, type: C, checked: S } = t.target
        ;(l((f) => ({ ...f, [d]: C === 'checkbox' ? S : N })),
          c((f) => ({ ...f, [d]: !0 })))
      },
      p = (t) => {
        l((d) => ({
          ...d,
          tags: d.tags.includes(t)
            ? d.tags.filter((N) => N !== t)
            : [...d.tags, t],
        }))
      },
      x = (t) => {
        ;(t.preventDefault(), h && (v(s), l(k), c({}), u()))
      },
      g = () => {
        ;(l(k), c({}), u())
      }
    return e.jsx('div', {
      className: 'modal-overlay',
      onClick: g,
      children: e.jsxs('div', {
        className: 'modal-content glass-panel',
        onClick: (t) => t.stopPropagation(),
        children: [
          e.jsxs('div', {
            className: 'modal-header',
            children: [
              e.jsx('h2', { children: 'Add New Service' }),
              e.jsx('button', {
                className: 'close-btn',
                onClick: g,
                children: '×',
              }),
            ],
          }),
          e.jsx('div', {
            className: 'modal-body',
            children: e.jsxs('form', {
              onSubmit: x,
              children: [
                e.jsxs('div', {
                  className: `form-group ${n.title && r.title ? 'has-error' : n.title && !r.title ? 'has-success' : ''}`,
                  children: [
                    e.jsxs('label', {
                      children: [
                        'Title ',
                        e.jsx('span', { className: 'required', children: '*' }),
                      ],
                    }),
                    e.jsx('input', {
                      type: 'text',
                      name: 'title',
                      value: s.title,
                      onChange: m,
                      placeholder: 'e.g. My Service',
                    }),
                    n.title &&
                      r.title &&
                      e.jsx('span', {
                        className: 'field-error',
                        children: r.title,
                      }),
                    n.title &&
                      !r.title &&
                      e.jsx('span', {
                        className: 'field-hint success',
                        children: i.title,
                      }),
                    !n.title &&
                      e.jsx('span', {
                        className: 'field-hint',
                        children: i.title,
                      }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'form-group',
                  children: [
                    e.jsx('label', { children: 'Category' }),
                    e.jsx('select', {
                      name: 'category',
                      value: s.category,
                      onChange: m,
                      children: B.map((t) =>
                        e.jsx('option', { value: t, children: t }, t),
                      ),
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: `form-group ${n.url && r.url ? 'has-error' : n.url && !r.url ? 'has-success' : ''}`,
                  children: [
                    e.jsxs('label', {
                      children: [
                        'URL ',
                        e.jsx('span', { className: 'required', children: '*' }),
                      ],
                    }),
                    e.jsx('input', {
                      type: 'text',
                      name: 'url',
                      value: s.url,
                      onChange: m,
                      placeholder: 'e.g. myapp.novitech.dev',
                    }),
                    n.url &&
                      r.url &&
                      e.jsx('span', {
                        className: 'field-error',
                        children: r.url,
                      }),
                    n.url &&
                      !r.url &&
                      e.jsx('span', {
                        className: 'field-hint success',
                        children: i.url,
                      }),
                    !n.url &&
                      e.jsx('span', {
                        className: 'field-hint',
                        children: i.url,
                      }),
                  ],
                }),
                e.jsxs('div', {
                  className: `form-group ${s.description.length > 200 ? 'has-error' : ''}`,
                  children: [
                    e.jsx('label', { children: 'Description' }),
                    e.jsx('textarea', {
                      name: 'description',
                      value: s.description,
                      onChange: m,
                      placeholder: 'Brief description of the service...',
                      rows: 3,
                    }),
                    e.jsx('span', {
                      className: `field-hint ${s.description.length > 200 ? 'error' : ''}`,
                      children: i.description,
                    }),
                  ],
                }),
                e.jsx('div', {
                  className: 'form-group checkbox-group',
                  children: e.jsxs('label', {
                    children: [
                      e.jsx('input', {
                        type: 'checkbox',
                        name: 'ssl',
                        checked: s.ssl,
                        onChange: m,
                      }),
                      'Enable SSL Protection',
                    ],
                  }),
                }),
                e.jsxs('div', {
                  className: 'form-group',
                  children: [
                    e.jsx('label', { children: 'Tags' }),
                    e.jsx('div', {
                      className: 'tags-grid',
                      children: V.map((t) =>
                        e.jsxs(
                          'label',
                          {
                            className: `tag-checkbox ${s.tags.includes(t) ? 'selected' : ''}`,
                            children: [
                              e.jsx('input', {
                                type: 'checkbox',
                                checked: s.tags.includes(t),
                                onChange: () => p(t),
                              }),
                              t,
                            ],
                          },
                          t,
                        ),
                      ),
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'form-preview',
                  children: [
                    e.jsx('h4', { children: 'Live Preview' }),
                    e.jsxs('div', {
                      className: 'preview-content',
                      children: [
                        e.jsxs('p', {
                          children: [
                            e.jsx('strong', { children: 'Title:' }),
                            ' ',
                            s.title || '—',
                          ],
                        }),
                        e.jsxs('p', {
                          children: [
                            e.jsx('strong', { children: 'Category:' }),
                            ' ',
                            s.category,
                          ],
                        }),
                        e.jsxs('p', {
                          children: [
                            e.jsx('strong', { children: 'URL:' }),
                            ' ',
                            s.url || '—',
                          ],
                        }),
                        e.jsxs('p', {
                          children: [
                            e.jsx('strong', { children: 'Description:' }),
                            ' ',
                            s.description || '—',
                          ],
                        }),
                        e.jsxs('p', {
                          children: [
                            e.jsx('strong', { children: 'SSL:' }),
                            ' ',
                            s.ssl ? 'Yes' : 'No',
                          ],
                        }),
                        e.jsxs('p', {
                          children: [
                            e.jsx('strong', { children: 'Tags:' }),
                            ' ',
                            s.tags.length > 0 ? s.tags.join(', ') : '—',
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'modal-actions',
                  children: [
                    e.jsx('button', {
                      type: 'button',
                      className: 'cancel-btn',
                      onClick: g,
                      children: 'Cancel',
                    }),
                    e.jsx('button', {
                      type: 'submit',
                      className: 'submit-btn',
                      disabled: !h,
                      children: 'Add Service',
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    })
  })
T.displayName = 'AddServiceModal'
const G = ['Infrastructure', 'Dev', 'Media', 'Personal'],
  Q = [
    'monitoring',
    'critical',
    'public',
    'internal',
    'production',
    'development',
  ],
  E = y.memo(({ isOpen: j, onClose: u, onSave: v, service: s }) => {
    const [l, n] = a.useState({
        title: '',
        category: 'Infrastructure',
        url: '',
        description: '',
        ssl: !1,
        tags: [],
      }),
      [c, r] = a.useState({})
    a.useEffect(() => {
      s &&
        (n({
          title: s.title || '',
          category: s.category || 'Infrastructure',
          url: s.url || '',
          description: s.description || '',
          ssl: s.ssl || !1,
          tags: s.tags || [],
        }),
        r({}))
    }, [s])
    const i = a.useMemo(() => {
        const t = {}
        return (
          l.title.length > 0 &&
            l.title.length < 3 &&
            (t.title = 'Title is too short (min 3 characters)'),
          l.title.trim() || (t.title = 'Title is required'),
          l.url.trim()
            ? l.url.includes(' ') && (t.url = 'URL cannot contain spaces')
            : (t.url = 'URL is required'),
          l.description.length > 200 &&
            (t.description = `Description too long (${l.description.length}/200)`),
          t
        )
      }, [l]),
      h = a.useMemo(
        () => ({
          title:
            l.title.length > 0 && l.title.length < 3
              ? `${3 - l.title.length} more character(s) needed`
              : l.title.length >= 3
                ? '✓ Looks good!'
                : 'Enter at least 3 characters',
          url:
            l.url.length > 0 && !l.url.includes(' ')
              ? '✓ Valid URL format'
              : 'Example: myapp.novitech.dev',
          description: `${l.description.length}/200 characters`,
        }),
        [l],
      ),
      m = a.useMemo(
        () =>
          l.title.trim().length >= 3 &&
          l.url.trim().length > 0 &&
          !l.url.includes(' ') &&
          l.description.length <= 200,
        [l],
      )
    if (!j || !s) return null
    const p = (t) => {
        const { name: d, value: N, type: C, checked: S } = t.target
        ;(n((f) => ({ ...f, [d]: C === 'checkbox' ? S : N })),
          r((f) => ({ ...f, [d]: !0 })))
      },
      x = (t) => {
        n((d) => ({
          ...d,
          tags: d.tags.includes(t)
            ? d.tags.filter((N) => N !== t)
            : [...d.tags, t],
        }))
      },
      g = (t) => {
        ;(t.preventDefault(), m && (v(s.id, l), u()))
      }
    return e.jsx('div', {
      className: 'modal-overlay',
      onClick: u,
      children: e.jsxs('div', {
        className: 'modal-content glass-panel',
        onClick: (t) => t.stopPropagation(),
        children: [
          e.jsxs('div', {
            className: 'modal-header',
            children: [
              e.jsx('h2', { children: 'Edit Service' }),
              e.jsx('button', {
                className: 'close-btn',
                onClick: u,
                children: '×',
              }),
            ],
          }),
          e.jsx('div', {
            className: 'modal-body',
            children: e.jsxs('form', {
              onSubmit: g,
              children: [
                e.jsxs('div', {
                  className: `form-group ${c.title && i.title ? 'has-error' : c.title && !i.title ? 'has-success' : ''}`,
                  children: [
                    e.jsxs('label', {
                      children: [
                        'Title ',
                        e.jsx('span', { className: 'required', children: '*' }),
                      ],
                    }),
                    e.jsx('input', {
                      type: 'text',
                      name: 'title',
                      value: l.title,
                      onChange: p,
                      placeholder: 'e.g. My Service',
                    }),
                    c.title &&
                      i.title &&
                      e.jsx('span', {
                        className: 'field-error',
                        children: i.title,
                      }),
                    c.title &&
                      !i.title &&
                      e.jsx('span', {
                        className: 'field-hint success',
                        children: h.title,
                      }),
                    !c.title &&
                      e.jsx('span', {
                        className: 'field-hint',
                        children: h.title,
                      }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'form-group',
                  children: [
                    e.jsx('label', { children: 'Category' }),
                    e.jsx('select', {
                      name: 'category',
                      value: l.category,
                      onChange: p,
                      children: G.map((t) =>
                        e.jsx('option', { value: t, children: t }, t),
                      ),
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: `form-group ${c.url && i.url ? 'has-error' : c.url && !i.url ? 'has-success' : ''}`,
                  children: [
                    e.jsxs('label', {
                      children: [
                        'URL ',
                        e.jsx('span', { className: 'required', children: '*' }),
                      ],
                    }),
                    e.jsx('input', {
                      type: 'text',
                      name: 'url',
                      value: l.url,
                      onChange: p,
                      placeholder: 'e.g. myapp.novitech.dev',
                    }),
                    c.url &&
                      i.url &&
                      e.jsx('span', {
                        className: 'field-error',
                        children: i.url,
                      }),
                    c.url &&
                      !i.url &&
                      e.jsx('span', {
                        className: 'field-hint success',
                        children: h.url,
                      }),
                    !c.url &&
                      e.jsx('span', {
                        className: 'field-hint',
                        children: h.url,
                      }),
                  ],
                }),
                e.jsxs('div', {
                  className: `form-group ${l.description.length > 200 ? 'has-error' : ''}`,
                  children: [
                    e.jsx('label', { children: 'Description' }),
                    e.jsx('textarea', {
                      name: 'description',
                      value: l.description,
                      onChange: p,
                      placeholder: 'Brief description of the service...',
                      rows: 3,
                    }),
                    e.jsx('span', {
                      className: `field-hint ${l.description.length > 200 ? 'error' : ''}`,
                      children: h.description,
                    }),
                  ],
                }),
                e.jsx('div', {
                  className: 'form-group checkbox-group',
                  children: e.jsxs('label', {
                    children: [
                      e.jsx('input', {
                        type: 'checkbox',
                        name: 'ssl',
                        checked: l.ssl,
                        onChange: p,
                      }),
                      'Enable SSL Protection',
                    ],
                  }),
                }),
                e.jsxs('div', {
                  className: 'form-group',
                  children: [
                    e.jsx('label', { children: 'Tags' }),
                    e.jsx('div', {
                      className: 'tags-grid',
                      children: Q.map((t) =>
                        e.jsxs(
                          'label',
                          {
                            className: `tag-checkbox ${l.tags.includes(t) ? 'selected' : ''}`,
                            children: [
                              e.jsx('input', {
                                type: 'checkbox',
                                checked: l.tags.includes(t),
                                onChange: () => x(t),
                              }),
                              t,
                            ],
                          },
                          t,
                        ),
                      ),
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'form-preview',
                  children: [
                    e.jsx('h4', { children: 'Live Preview' }),
                    e.jsxs('div', {
                      className: 'preview-content',
                      children: [
                        e.jsxs('p', {
                          children: [
                            e.jsx('strong', { children: 'Title:' }),
                            ' ',
                            l.title || '—',
                          ],
                        }),
                        e.jsxs('p', {
                          children: [
                            e.jsx('strong', { children: 'Category:' }),
                            ' ',
                            l.category,
                          ],
                        }),
                        e.jsxs('p', {
                          children: [
                            e.jsx('strong', { children: 'URL:' }),
                            ' ',
                            l.url || '—',
                          ],
                        }),
                        e.jsxs('p', {
                          children: [
                            e.jsx('strong', { children: 'Description:' }),
                            ' ',
                            l.description || '—',
                          ],
                        }),
                        e.jsxs('p', {
                          children: [
                            e.jsx('strong', { children: 'SSL:' }),
                            ' ',
                            l.ssl ? 'Yes' : 'No',
                          ],
                        }),
                        e.jsxs('p', {
                          children: [
                            e.jsx('strong', { children: 'Tags:' }),
                            ' ',
                            l.tags.length > 0 ? l.tags.join(', ') : '—',
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'modal-actions',
                  children: [
                    e.jsx('button', {
                      type: 'button',
                      className: 'cancel-btn',
                      onClick: u,
                      children: 'Cancel',
                    }),
                    e.jsx('button', {
                      type: 'submit',
                      className: 'submit-btn',
                      disabled: !m,
                      children: 'Save Changes',
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    })
  })
E.displayName = 'EditServiceModal'
const Y = ['Infrastructure', 'Dev', 'Media', 'Personal'],
  J = () => {
    const {
        services: j,
        isLoading: u,
        addService: v,
        editService: s,
        deleteService: l,
        toggleStatus: n,
        stats: c,
      } = a.useContext(_),
      {
        filter: r,
        searchQuery: i,
        sortOrder: h,
        setFilter: m,
        setSearchQuery: p,
        setSortOrder: x,
      } = a.useContext(F),
      { addNotification: g } = a.useContext(U),
      [t, d] = a.useState(!1),
      [N, C] = a.useState(null),
      S = a.useCallback(
        (o) => {
          ;(v(o), g(`Service "${o.title}" added successfully!`, 'success'))
        },
        [v, g],
      ),
      f = a.useCallback(
        (o, b) => {
          ;(s(o, b), g(`Service "${b.title}" updated successfully!`, 'success'))
        },
        [s, g],
      ),
      D = a.useCallback(
        (o) => {
          window.confirm('Are you sure you want to delete this service?') &&
            (l(o), g('Service deleted.', 'info'))
        },
        [l, g],
      ),
      w = a.useCallback(
        (o) => {
          n(o)
        },
        [n],
      ),
      M = a.useCallback((o) => {
        C(o)
      }, []),
      R = a.useCallback(() => {
        d(!0)
      }, []),
      I = a.useCallback(() => {
        d(!1)
      }, []),
      O = a.useCallback(() => {
        C(null)
      }, []),
      A = a.useMemo(
        () =>
          j
            .filter((o) => {
              const b = r === 'All' || o.category === r,
                P =
                  o.title.toLowerCase().includes(i.toLowerCase()) ||
                  o.url.toLowerCase().includes(i.toLowerCase())
              return b && P
            })
            .sort((o, b) => {
              switch (h) {
                case 'name_asc':
                  return o.title.localeCompare(b.title)
                case 'name_desc':
                  return b.title.localeCompare(o.title)
                case 'date_new':
                  return b.createdAt - o.createdAt
                case 'date_old':
                  return o.createdAt - b.createdAt
                default:
                  return 0
              }
            }),
        [j, r, i, h],
      )
    return u
      ? e.jsxs('div', {
          className: 'loading-screen',
          children: [
            e.jsx('div', { className: 'spinner' }),
            e.jsx('p', { children: 'Loading Dashboard...' }),
          ],
        })
      : e.jsxs('div', {
          className: 'dashboard',
          children: [
            e.jsxs('header', {
              className: 'dashboard-header',
              children: [
                e.jsx('h1', { children: 'Dashboard' }),
                e.jsx('button', {
                  className: 'add-btn',
                  onClick: R,
                  children: '+ Add Service',
                }),
              ],
            }),
            e.jsx(q, {
              totalServices: c.total,
              activeCount: c.active,
              sslCount: c.ssl,
              categoriesCount: c.categories,
            }),
            e.jsx($, {
              categories: Y,
              activeCategory: r,
              onCategoryChange: m,
              searchQuery: i,
              onSearchChange: p,
              sortOrder: h,
              onSortChange: x,
            }),
            e.jsx('div', {
              className: 'services-grid',
              children:
                A.length > 0
                  ? A.map((o) =>
                      e.jsx(
                        L,
                        {
                          service: o,
                          onToggleStatus: w,
                          onDelete: D,
                          onEdit: M,
                        },
                        o.id,
                      ),
                    )
                  : e.jsx('div', {
                      className: 'no-results glass-panel',
                      children: e.jsx('p', {
                        children: 'No services found matching your criteria.',
                      }),
                    }),
            }),
            e.jsx(T, { isOpen: t, onClose: I, onAdd: S }),
            e.jsx(E, { isOpen: !!N, onClose: O, onSave: f, service: N }),
          ],
        })
  }
export { J as default }
