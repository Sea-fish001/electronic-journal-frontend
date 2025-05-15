import React, { useState } from 'react';
import { useAuth } from '../../services/auth';
import Button from '../Shared/Button';

function Login({ onClose, onSwitchType }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!email || !password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        const result = await login(email, password);
        if (!result.success) {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h1>Вход</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">E-mail<span className="asterisk">*</span></label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Введите почту"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль<span className="asterisk">*</span></label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button
                        className="form-btn login-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Загрузка...' : 'Войти'}
                    </Button>
                    <div className="switch-text">
                        Нет аккаунта? <a className="switch-link" onClick={onSwitchType}>Зарегистрироваться</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;