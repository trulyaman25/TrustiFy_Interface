import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ethers } from 'ethers';
import MetaMaskLogo from '../../../assets/icons/metamask-fox.svg';
import Logo from '../../../assets/branding/checkMate - Logo.png';

function CompanySignIn({ isPanel = false }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        walletAddress: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (error) setError('');
    };

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                setError('Please install MetaMask to use this feature');
                return;
            }
            setLoading(true);
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setFormData(prev => ({ ...prev, walletAddress: address }));
            setError('');
        } catch (err) {
            setError('Failed to connect wallet: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const response = await axios.post('http://127.0.0.1:5000/login-company', formData);
            const { companyId } = response.data;
            
            if (!companyId) {
                throw new Error('No company ID received from server');
            }
            
            navigate(`/company/dashboard/${companyId}`);
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.error || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    const containerClasses = isPanel 
        ? "w-full h-full font-albulaRegular" 
        : "fixed w-full h-screen font-albulaRegular";

    const sectionClasses = isPanel
        ? "w-full bg-white h-fit px-12 py-6"
        : "w-[500px] bg-white h-fit rounded-[40px] px-12 py-12 shadow-xl";

    return (
        <main className={containerClasses}>
            <div className={`flex flex-row justify-center items-center bg-white text-gray-900 ${!isPanel && "h-full border-gray-400 shadow-inner"}`}>
                <section className={sectionClasses}>
                    <div className="flex flex-col items-center justify-center mb-8">
                        <img src={Logo} alt="TrustiFy Logo" className="w-24 h-24 mb-4"/>
                        <h1 className="font-albulaHeavy text-4xl text-slate-800">Company Sign In</h1>
                    </div>
                    
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-albulaBold text-gray-600">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-albulaBold text-gray-600">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                    className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={connectWallet}
                                disabled={loading}
                                className="w-full mb-4 h-[50px] bg-orange-500 rounded-xl font-albulaBold uppercase text-white hover:bg-orange-600 transition-all duration-300 hover:drop-shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <img src={MetaMaskLogo} alt="MetaMask" className="w-6 h-6" />
                                {loading ? 'Connecting...' : (formData.walletAddress ? 'Wallet Connected' : 'Connect MetaMask')}
                            </button>
                        </div>

                        {formData.walletAddress && (
                            <div className="w-full bg-gray-50 p-3 rounded-xl">
                                <p className="text-sm text-gray-600 break-all">Connected: {formData.walletAddress}</p>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-[50px] bg-[#8360ff] rounded-xl font-albulaBold uppercase text-white hover:bg-purple-700 transition-all duration-300 hover:drop-shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </div>

                        {!isPanel && (
                            <div className="text-center mt-4">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <NavLink to="/companyRegister" className="font-albulaMedium text-indigo-600 hover:text-indigo-500">
                                        Sign up
                                    </NavLink>
                                </p>
                            </div>
                        )}
                    </form>
                </section>
            </div>
        </main>
    );
}

export default CompanySignIn;