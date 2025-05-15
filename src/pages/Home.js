import React from 'react';
import Header from '../components/Shared/Header';
import Button from '../components/Shared/Button';
import AuthPopup from '../components/Auth/AuthPopup';
import '../styles/shared.css';
import '../styles/auth.css';

function Home() {
    const [showAuthPopup, setShowAuthPopup] = React.useState(false);
    const [authType, setAuthType] = React.useState('login');

    return (
        <div className="home-container">
            <Header />
            <div className="title">ЭЛЕКТРОННЫЙ ЖУРНАЛ АВТОРСКОГО НАДЗОРА</div>
            <Button
                className="button"
                onClick={() => {
                    setShowAuthPopup(true);
                    setAuthType('login');
                }}
            >
                ВХОД
            </Button>
            <div className="image">
                <img src="image/houses.png" alt="Дом" />
            </div>

            {showAuthPopup && (
                <AuthPopup
                    type={authType}
                    onClose={() => setShowAuthPopup(false)}
                    onSwitchType={() => setAuthType(authType === 'login' ? 'register' : 'login')}
                />
            )}
        </div>
    );
}

export default Home;