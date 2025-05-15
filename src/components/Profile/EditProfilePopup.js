import React, { useState } from 'react';
import Button from '../Shared/Button';

function EditProfilePopup({ currentInfo, onSave, onClose }) {
    const [formData, setFormData] = useState({
        email: currentInfo.email,
        phone: currentInfo.phone
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation
        if (!formData.email) {
            setError('Email is required');
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            setError('Please enter a valid email');
            return;
        }

        setError('');
        onSave(formData);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="popup-header">
                    <div className="popup-title">Изменение контактных данных</div>
                    <button className="close-popup" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">E-mail:</label>
                        <input
                            type="email"
                            className="form-input"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="phone">Телефон:</label>
                        <input
                            type="tel"
                            className="form-input"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="popup-actions">
                        <Button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                        >
                            Отмена
                        </Button>
                        <Button type="submit" className="save-button">
                            Сохранить
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfilePopup;