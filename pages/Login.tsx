import React, { useState } from 'react';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import api from '../api';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('token/', { email, password });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            window.location.hash = '#/admin';
            window.location.reload(); // Refresh to update App state
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-earth-50 flex items-center justify-center px-6">
            <div className="max-w-md w-full bg-white rounded-[3rem] p-12 border border-earth-100 shadow-xl animate-fade-up">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-savanna-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-savanna-500/20">
                        <Lock size={32} />
                    </div>
                    <h2 className="text-3xl font-serif font-black text-earth-900">Staff Portal</h2>
                    <p className="text-earth-400 font-medium mt-2">Access organizational dashboard</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 ml-4">Email Address</label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-earth-50 border-2 border-transparent rounded-2xl pl-12 pr-6 py-4 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all font-bold"
                                placeholder="admin@adc-consortium.org"
                            />
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-300" size={18} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-earth-400 ml-4">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-earth-50 border-2 border-transparent rounded-2xl pl-12 pr-6 py-4 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all font-bold"
                                placeholder="••••••••"
                            />
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-300" size={18} />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-earth-900 hover:bg-savanna-500 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 disabled:opacity-70 disabled:active:scale-100 group"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Login to Dashboard'}
                    </button>
                </form>

                <p className="mt-10 text-center text-xs text-earth-400 font-medium italic">
                    Restricted access for authorized ADC staff only.
                </p>
            </div>
        </div>
    );
};
