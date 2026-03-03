import React, { useMemo, useState } from 'react'
import './AddServiceModal.css'

const CATEGORIES = ['Infrastructure', 'Dev', 'Media', 'Personal']
const AVAILABLE_TAGS = [
  'monitoring',
  'critical',
  'public',
  'internal',
  'production',
  'development',
]

const INITIAL_FORM = {
  title: '',
  category: 'Infrastructure',
  url: '',
  description: '',
  ssl: false,
  tags: [],
}

/* Task 1: Controlled form for adding elements */
/* Task 7: React.memo to prevent unnecessary re-renders */
const AddServiceModal = React.memo(({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [touched, setTouched] = useState({})

  /* Task 2: Real-time validation with useMemo */
  const errors = useMemo(() => {
    const errs = {}
    if (formData.title.length > 0 && formData.title.length < 3) {
      errs.title = 'Title is too short (min 3 characters)'
    }
    if (touched.title && !formData.title.trim()) {
      errs.title = 'Title is required'
    }
    if (touched.url && !formData.url.trim()) {
      errs.url = 'URL is required'
    } else if (formData.url.includes(' ')) {
      errs.url = 'URL cannot contain spaces'
    }
    if (formData.description.length > 200) {
      errs.description = `Description too long (${formData.description.length}/200)`
    }
    return errs
  }, [formData, touched])

  /* Task 5: Dynamic hints for each field */
  const hints = useMemo(
    () => ({
      title:
        formData.title.length > 0 && formData.title.length < 3
          ? `${3 - formData.title.length} more character(s) needed`
          : formData.title.length >= 3
            ? '✓ Looks good!'
            : 'Enter at least 3 characters',
      url:
        formData.url.length > 0 && !formData.url.includes(' ')
          ? '✓ Valid URL format'
          : 'Example: myapp.novitech.dev',
      description: `${formData.description.length}/200 characters`,
    }),
    [formData],
  )

  const isValid = useMemo(() => {
    return (
      formData.title.trim().length >= 3 &&
      formData.url.trim().length > 0 &&
      !formData.url.includes(' ') &&
      formData.description.length <= 200
    )
  }, [formData])

  if (!isOpen) return null

  /* Task 3: Handling multiple controlled fields */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  /* Task 6: Checkbox toggles for tags */
  const handleTagToggle = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) return
    onAdd(formData)
    setFormData(INITIAL_FORM)
    setTouched({})
    onClose()
  }

  const handleClose = () => {
    setFormData(INITIAL_FORM)
    setTouched({})
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-content glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Add New Service</h2>
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            {/* Title field with validation */}
            <div
              className={`form-group ${touched.title && errors.title ? 'has-error' : touched.title && !errors.title ? 'has-success' : ''}`}
            >
              <label>
                Title <span className="required">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Some Service"
              />
              {touched.title && errors.title && (
                <span className="field-error">{errors.title}</span>
              )}
              {touched.title && !errors.title && (
                <span className="field-hint success">{hints.title}</span>
              )}
              {!touched.title && (
                <span className="field-hint">{hints.title}</span>
              )}
            </div>

            {/* Task 6: Dropdown for category */}
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* URL field with validation */}
            <div
              className={`form-group ${touched.url && errors.url ? 'has-error' : touched.url && !errors.url ? 'has-success' : ''}`}
            >
              <label>
                URL <span className="required">*</span>
              </label>
              <input
                type="text"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="myapp.novitech.dev"
              />
              {touched.url && errors.url && (
                <span className="field-error">{errors.url}</span>
              )}
              {touched.url && !errors.url && (
                <span className="field-hint success">{hints.url}</span>
              )}
              {!touched.url && <span className="field-hint">{hints.url}</span>}
            </div>

            {/* Task 3: Description textarea */}
            <div
              className={`form-group ${formData.description.length > 200 ? 'has-error' : ''}`}
            >
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of the service..."
                rows={3}
              />
              <span
                className={`field-hint ${formData.description.length > 200 ? 'error' : ''}`}
              >
                {hints.description}
              </span>
            </div>

            {/* Task 6: SSL checkbox */}
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="ssl"
                  checked={formData.ssl}
                  onChange={handleChange}
                />
                Enable SSL Protection
              </label>
            </div>

            {/* Task 6: Tags checkboxes */}
            <div className="form-group">
              <label>Tags</label>
              <div className="tags-grid">
                {AVAILABLE_TAGS.map((tag) => (
                  <label
                    key={tag}
                    className={`tag-checkbox ${formData.tags.includes(tag) ? 'selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.tags.includes(tag)}
                      onChange={() => handleTagToggle(tag)}
                    />
                    {tag}
                  </label>
                ))}
              </div>
            </div>

            {/* Task 3: Live form state preview */}
            <div className="form-preview">
              <h4>Live Preview</h4>
              <div className="preview-content">
                <p>
                  <strong>Title:</strong> {formData.title || '—'}
                </p>
                <p>
                  <strong>Category:</strong> {formData.category}
                </p>
                <p>
                  <strong>URL:</strong> {formData.url || '—'}
                </p>
                <p>
                  <strong>Description:</strong> {formData.description || '—'}
                </p>
                <p>
                  <strong>SSL:</strong> {formData.ssl ? 'Yes' : 'No'}
                </p>
                <p>
                  <strong>Tags:</strong>{' '}
                  {formData.tags.length > 0 ? formData.tags.join(', ') : '—'}
                </p>
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button type="submit" className="submit-btn" disabled={!isValid}>
                Add Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
})

AddServiceModal.displayName = 'AddServiceModal'

export default AddServiceModal
