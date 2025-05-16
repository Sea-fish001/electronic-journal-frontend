import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                }
                setIsLoggedIn(true);
                navigate('/profile');
            } else {
                const errorData = await response.json();
                throw new Error(
                    response.status === 401
                        ? 'Неверный email или пароль'
                        : errorData.message || 'Ошибка входа'
                );
            }
        } catch (error) {
            throw new Error(
                error.message || 'Произошла ошибка при соединении с сервером'
            );
        }
    };

    const register = async (fullName, email, organization, password) => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    organization,
                    password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    response.status === 409
                        ? 'Пользователь с таким email уже зарегистрирован'
                        : errorData.message || 'Ошибка регистрации'
                );
            }
        } catch (error) {
            throw new Error(
                error.message || 'Произошла ошибка при соединении с сервером'
            );
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        navigate('/');
    };

    return { isLoggedIn, login, register, logout };
};