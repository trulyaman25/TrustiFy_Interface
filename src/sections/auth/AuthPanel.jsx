import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StudentSignIn from './studentAuth/studentSignIn';
import StudentSignUp from './studentAuth/studentSignUp';
import CompanySignIn from './companyAuth/companySignIn';
import CompanySignUp from './companyAuth/companySignUp';

function AuthPanel({ isOpen, onClose, initialMode = 'login', userType = 'student' }) {
    const [mode, setMode] = useState(initialMode);

    // Update mode when initialMode prop changes
    useEffect(() => {
        setMode(initialMode);
    }, [initialMode]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black z-40" onClick={onClose} />
                    
                    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }} className="fixed right-0 top-0 h-full w-[800px] bg-white z-50 overflow-y-auto" >
                        <div className="relative">
                            <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 z-50" >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="p-6">
                                {userType === 'student' ? (
                                    mode === 'login' ? (
                                        <div>
                                            <StudentSignIn isPanel={true} />
                                            <p className="text-center mt-4 text-sm text-gray-600">
                                                Don't have an account?{' '}
                                                <button onClick={() => setMode('signup')} className="text-indigo-600 hover:text-indigo-500 font-medium" >
                                                    Sign up
                                                </button>
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <StudentSignUp isPanel={true} setMode={setMode}/>
                                            <p className="text-center mt-4 text-sm text-gray-600">
                                                Already have an account?{' '}
                                                <button onClick={() => setMode('login')} className="text-indigo-600 hover:text-indigo-500 font-medium" >
                                                    Sign in
                                                </button>
                                            </p>
                                        </div>
                                    )
                                ) : (
                                    mode === 'login' ? (
                                        <div>
                                            <CompanySignIn isPanel={true} />
                                            <p className="text-center mt-4 text-sm text-gray-600">
                                                Don't have an account?{' '}
                                                <button onClick={() => setMode('signup')} className="text-indigo-600 hover:text-indigo-500 font-medium" >
                                                    Sign up
                                                </button>
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <CompanySignUp isPanel={true} setMode={setMode}/>
                                            <p className="text-center mt-4 text-sm text-gray-600">
                                                Already have an account?{' '}
                                                <button onClick={() => setMode('login')} className="text-indigo-600 hover:text-indigo-500 font-medium" >
                                                    Sign in
                                                </button>
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default AuthPanel;