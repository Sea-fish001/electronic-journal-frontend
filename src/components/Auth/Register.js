import React, { useState } from 'react';
import { useAuth } from '../../services/auth';
import Button from '../Shared/Button';

function Register({ onClose, onSwitchType }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { name, email, organization, password, confirmPassword } = formData;

        // Validation
        if (!name || !email || !organization || !password || !confirmPassword) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        const result = await register({
            name,
            email,
            organization,
            password
        });

        if (!result.success) {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h1>Регистрация</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">ФИО<span className="asterisk">*</span></label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Введите ФИО"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mail<span className="asterisk">*</span></label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Введите почту"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="organization">Организация<span className="asterisk">*</span></label>
                        <input
                            type="text"
                            id="organization"
                            placeholder="Введите организацию"
                            value={formData.organization}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль<span className="asterisk">*</span></label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Придумайте пароль"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Подтвердите пароль<span className="asterisk">*</span></label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Повторите пароль"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <Button
                        className="form-btn login-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Загрузка...' : 'Зарегистрироваться'}
                    </Button>
                    <div className="switch-text">
                        Уже есть аккаунт? <a className="switch-link" onClick={onSwitchType}>Войти</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;