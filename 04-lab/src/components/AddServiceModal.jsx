import React, { useState } from 'react';
import './AddServiceModal.css';

const AddServiceModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Infrastructure',
        url: '',
        ssl: false
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.url) return;

        onAdd(formData);
        setFormData({ title: '', category: 'Infrastructure', url: '', ssl: false });
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add New Service</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Immich"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="Infrastructure">Infrastructure</option>
                            <option value="Dev">Dev</option>
                            <option value="Media">Media</option>
                            <option value="Personal">Personal</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>URL</label>
                        <input
                            type="text"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            placeholder="e.g. immich.novitech.dev"
                            required
                        />
                    </div>

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

                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="submit-btn">Add Service</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddServiceModal;
