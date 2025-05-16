import React, { useState } from 'react';
import { useAuth } from '../services/auth';
import '../styles/home.css';

const HomePage = () => {
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [showRegisterPopup, setShowRegisterPopup] = useState(false);
    const { login, register } = useAuth();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.elements.username.value;
        const password = e.target.elements.password.value;

        if (!email || !password) {
            alert('Email и пароль обязательны для заполнения');
            return;
        }

        try {
            await login(email, password);
            setShowLoginPopup(false);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const fullName = e.target.elements['reg-username'].value;
        const email = e.target.elements['reg-email'].value;
        const organization = e.target.elements['reg-organization'].value;
        const password = e.target.elements['reg-password'].value;
        const confirmPassword = e.target.elements['reg-confirm'].value;

        if (!fullName || !email || !organization || !password || !confirmPassword) {
            alert('Все поля обязательны для заполнения');
            return;
        }

        if (password !== confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }

        try {
            await register(fullName, email, organization, password);
            setShowRegisterPopup(false);
            setShowLoginPopup(true);
            alert('Регистрация прошла успешно!');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="home-page">
            <div className="header">INPAD</div>
            <div className="title">ЭЛЕКТРОННЫЙ ЖУРНАЛ АВТОРСКОГО НАДЗОРА</div>
            <button className="button" onClick={() => setShowLoginPopup(true)}>
                ВХОД
            </button>
            <div className="image">
                <img src="image/houses.png" alt="Дом" />
            </div>

            {/* Login Popup */}
            {showLoginPopup && (
                <div className="grey-popup" onClick={() => setShowLoginPopup(false)}>
                    <div className="popup" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-content">
              <span className="close-btn" onClick={() => setShowLoginPopup(false)}>
                &times;
              </span>
                            <h1>Вход</h1>
                            <form onSubmit={handleLoginSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">
                                        E-mail<span className="asterisk">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        placeholder="Введите почту"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        Пароль<span className="asterisk">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Введите пароль"
                                    />
                                </div>
                                <button type="submit" className="form-btn login-btn">
                                    Войти
                                </button>
                            </form>
                            <div className="switch-text">
                                Нет аккаунта?{' '}
                                <a
                                    className="switch-link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowLoginPopup(false);
                                        setShowRegisterPopup(true);
                                    }}
                                >
                                    Зарегистрироваться
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Register Popup */}
            {showRegisterPopup && (
                <div className="grey-popup" onClick={() => setShowRegisterPopup(false)}>
                    <div className="popup" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-content">
              <span className="close-btn" onClick={() => setShowRegisterPopup(false)}>
                &times;
              </span>
                            <h1>Регистрация</h1>
                            <form onSubmit={handleRegisterSubmit}>
                                <div className="form-group">
                                    <label htmlFor="reg-username">
                                        ФИО<span className="asterisk">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="reg-username"
                                        placeholder="Введите ФИО"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reg-email">
                                        E-mail<span className="asterisk">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="reg-email"
                                        placeholder="Введите почту"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reg-organization">
                                        Организация<span className="asterisk">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="reg-organization"
                                        placeholder="Введите организацию"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reg-password">
                                        Пароль<span className="asterisk">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        id="reg-password"
                                        placeholder="Придумайте пароль"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reg-confirm">
                                        Подтвердите пароль<span className="asterisk">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        id="reg-confirm"
                                        placeholder="Повторите пароль"
                                    />
                                </div>
                                <button type="submit" className="form-btn login-btn">
                                    Зарегистрироваться
                                </button>
                            </form>
                            <div className="switch-text">
                                Уже есть аккаунт?{' '}
                                <a
                                    className="switch-link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowRegisterPopup(false);
                                        setShowLoginPopup(true);
                                    }}
                                >
                                    Войти
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;