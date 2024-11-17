import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axiosConfig';
import './Register.css';
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Паролі не співпадають');
            return;
        }
        try {
            await api.post('/auth/register', { email, password });
            navigate('/login');
        } catch (err) {
            setError('Помилка реєстрації');
        }
    };

    return (
        <div className="register-container">
            <h1>Реєстрація</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Підтвердьте пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <p>{error}</p>}
                <button type="submit">Зареєструватися</button>
            </form>
            <div className="login-redirect-text">
                <p>
                    Вже маєте акаунт?{' '}
                    <a href="/login">Увійти</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
