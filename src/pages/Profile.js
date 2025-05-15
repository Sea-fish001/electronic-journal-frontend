import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Shared/Header';
import Button from '../components/Shared/Button';
import EditProfilePopup from '../components/Profile/EditProfilePopup';
import '../styles/profile.css';

function ProfilePage() {
    const { user, logout } = useAuth();
    const [contactInfo, setContactInfo] = useState({
        email: user?.email || '',
        phone: user?.phone || ''
    });
    const [showEditPopup, setShowEditPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSave = async (newInfo) => {
        try {
            // Here you would typically make an API call to update the user's info
            // For now, we'll just update the local state
            setContactInfo(newInfo);
            setShowEditPopup(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    if (!user) {
        return null; // or loading spinner
    }

    return (
        <div className="profile-page">
            <div className="top-bar">
                <Header />
                <Button className="objects-button">Доступные объекты</Button>
            </div>

            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-title">ПРОФИЛЬ</div>
                </div>

                <div className="profile-section">
                    <div className="info-row">
                        <div className="info-label">ФИО:</div>
                        <div className="info-value">{user.name}</div>
                    </div>
                    <div className="info-row">
                        <div className="info-label">Организация:</div>
                        <div className="info-value">{user.organization}</div>
                    </div>
                </div>

                <div className="profile-section">
                    <div className="section-title">КОНТАКТНАЯ ИНФОРМАЦИЯ:</div>
                    <div className="info-row">
                        <div className="info-label">E-mail:</div>
                        <div className="info-value">{contactInfo.email || 'Не указан'}</div>
                    </div>
                    <div className="info-row">
                        <div className="info-label">Телефон:</div>
                        <div className="info-value">{contactInfo.phone || 'Не указан'}</div>
                    </div>
                </div>

                <Button className="edit-button" onClick={() => setShowEditPopup(true)}>
                    Изменить
                </Button>
            </div>

            {showEditPopup && (
                <EditProfilePopup
                    currentInfo={contactInfo}
                    onSave={handleSave}
                    onClose={() => setShowEditPopup(false)}
                />
            )}
        </div>
    );
}

export default ProfilePage;