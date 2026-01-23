
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../config';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateInput = (input) => {
        // Basic SQL Injection patterns
        const sqlPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE)\b)|(--)|(;)|(')|(")|(\/\*)|(\*\/)/i;
        // Basic XSS patterns
        const xssPattern = /(<script>)|(javascript:)|(onload)|(onerror)|(<)|(>)/i;

        if (sqlPattern.test(input)) return "Invalid characters detected (SQLi attempt).";
        if (xssPattern.test(input)) return "Invalid characters detected (XSS attempt).";
        return null;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const emailError = validateInput(email);
        const passError = validateInput(password);

        if (emailError || passError) {
            setError(emailError || passError);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('username', email);
            formData.append('password', password);

            const response = await fetch(`${API}/auth/token`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Login failed');
            }

            const data = await response.json();
            localStorage.setItem('access_token', data.access_token);
            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Login failed:', err);
            setError('Invalid credentials or server error');
        }
    };


    return (
        <div className="min-h-screen bg-[var(--c-bg)] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                <div className="bg-[var(--c-primary)] p-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">Admin Portal</h2>
                    <p className="text-white/80">Restricted Access</p>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider block">
                                Email / Username
                            </label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--c-primary)] focus:ring-2 focus:ring-[var(--c-primary)]/20 outline-none transition-all"
                                placeholder="Enter admin ID"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider block">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--c-primary)] focus:ring-2 focus:ring-[var(--c-primary)]/20 outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[var(--c-primary)] text-white font-bold uppercase py-4 rounded-xl shadow-lg hover:bg-[#238b7e] hover:shadow-xl hover:-translate-y-0.5 transition-all mt-2"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link to="/" className="text-gray-500 hover:text-[var(--c-primary)] text-sm font-medium transition-colors">
                            ← Back to Website
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { AdminLogin };
