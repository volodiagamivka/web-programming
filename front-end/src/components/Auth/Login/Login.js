import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import api from '../../../api/axiosConfig';
import './Login.css';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            const redirectTo = location.state?.redirectTo || '/'; 
        navigate(redirectTo);
        } catch (err) {
            setError('Невірні дані для входу');
        }
    };

    return (
        <div className="login-container">
            <h1>Логін</h1>
            <form onSubmit={handleLogin}>
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
                {error && <p>{error}</p>}
                <button type="submit">Увійти</button>
            </form>
            <div className="register-text">
                <p>
                    Ви не зареєстровані?{' '}
                    <a href="/register">Створити акаунт</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
