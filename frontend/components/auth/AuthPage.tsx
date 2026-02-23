"use client";

import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Eye, EyeOff, X } from 'lucide-react';
import { AuthContext } from '../../context/AppContext';
import { api } from '../../lib/api';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import SmartSplitLogo from '../ui/SmartSplitLogo';

const AuthPage = ({ mode }: { mode: 'login' | 'register' }) => {
    const { login } = useContext(AuthContext);
    const router = useRouter();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        setError('');
        setSuccess('');
        setShowPass(false);
        setShowConfirmPass(false);
    }, [mode]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid @gmail.com address.");
            setLoading(false);
            return;
        }

        if (mode === 'register') {
            if (formData.password !== formData.confirmPassword) {
                setError("Passwords do not match.");
                setLoading(false);
                return;
            }
            if (formData.password.length < 8) {
                setError("Password must be at least 8 characters.");
                setLoading(false);
                return;
            }
            if (!/[A-Z]/.test(formData.password)) {
                setError("Password must contain at least one capital letter.");
                setLoading(false);
                return;
            }
            if (!/\d/.test(formData.password)) {
                setError("Password must contain at least one number.");
                setLoading(false);
                return;
            }
        }

        try {
            if (mode === 'register') {
                await api.register(formData.name, formData.email, formData.password);
                setSuccess("Registered successfully! Redirecting to login...");
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                const res = await api.login(formData.email, formData.password);
                login(res.user, res.token);
                router.push('/dashboard');
            }
        } catch (err: unknown) {
            const error = err as Error;
            setError(error.message);
        } finally {
            if (mode !== 'register' || error) {
                setLoading(false);
            }
        }
    };

    const togglePass = () => setShowPass(!showPass);
    const toggleConfirmPass = () => setShowConfirmPass(!showConfirmPass);

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 transition-colors">
            <Card className="w-full max-w-lg border border-gray-100 dark:border-gray-800 shadow-2xl p-10">
                <div className="text-center mb-10">
                    <div className="inline-flex mb-6">
                        <SmartSplitLogo />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 mt-3">
                        {mode === 'login' ? 'Enter your details to access your account.' : 'Join SmartSplit to start managing expenses.'}
                    </p>
                </div>

                {error && (
                    <div className="mb-8 p-4 bg-brand-orange/10 text-brand-orange rounded-2xl text-base font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-2 border border-brand-orange/20">
                        <X size={20} /> {error}
                    </div>
                )}

                {success && (
                    <div className="mb-8 p-4 bg-green-500/10 text-green-500 rounded-2xl text-base font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-2 border border-green-500/20">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div> {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {mode === 'register' && (
                        <Input
                            label="Full Name"
                            placeholder="e.g. John Doe"
                            value={formData.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                            required
                            leftElement={<User size={20} />}
                        />
                    )}
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="john@gmail.com"
                        value={formData.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                        required
                        leftElement={<Mail size={20} />}
                    />
                    <Input
                        label="Password"
                        type={showPass ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                        required
                        leftElement={<Lock size={20} />}
                        rightElement={
                            <button type="button" onClick={togglePass} className="hover:text-brand-blue transition-colors p-1">
                                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        }
                    />
                    {mode === 'register' && (
                        <Input
                            label="Confirm Password"
                            type={showConfirmPass ? "text" : "password"}
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                            leftElement={<Lock size={20} />}
                            rightElement={
                                <button type="button" onClick={toggleConfirmPass} className="hover:text-brand-blue transition-colors p-1">
                                    {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            }
                        />
                    )}

                    <Button className="w-full py-4 mt-4 text-lg shadow-xl shadow-brand-blue/25" isLoading={loading} type="submit">
                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                    </Button>
                </form>

                <div className="mt-10 text-center text-base text-gray-600 dark:text-gray-400">
                    {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => router.push(mode === 'login' ? '/register' : '/login')}
                        className="text-brand-blue font-bold hover:underline transition-all"
                    >
                        {mode === 'login' ? 'Sign up' : 'Log in'}
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default AuthPage;
