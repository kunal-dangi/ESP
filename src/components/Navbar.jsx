import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const [isRegistered, setIsRegistered] = useState(false);
    
    useEffect(() => {
        // Initial check
        setIsRegistered(localStorage.getItem('startupRegistered') === 'true');

        // Listen for storage events (changes in other tabs)
        const handleStorageChange = () => {
            setIsRegistered(localStorage.getItem('startupRegistered') === 'true');
        };

        // Listen for custom event (changes in the current tab)
        const handleCustomEvent = () => {
            setIsRegistered(localStorage.getItem('startupRegistered') === 'true');
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('startupRegistered', handleCustomEvent);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('startupRegistered', handleCustomEvent);
        };
    }, []);

    // Only show if we need it. If it shouldn't change the design, we'll keep it minimal and transparent.
    return (
        <nav className="top-navbar">
            <div className="container nav-content">
                <Link to="/" className="nav-brand">
                    <span className="gradient-text">Syntrix</span>
                </Link>
                <div className="nav-links">
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                    <Link to="/pricing" className={location.pathname === '/pricing' ? 'active' : ''}>Pricing</Link>
                    {isRegistered ? (
                        <>
                            {location.pathname !== '/' && (
                                <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
                            )}
                            {location.pathname === '/dashboard' && (
                                <Link to="/pricing" className="btn btn-primary" style={{ padding: '0.4rem 1.2rem', fontSize: '0.9rem' }}>Upgrade</Link>
                            )}
                        </>
                    ) : (
                        <Link to="/register" className="btn btn-primary" style={{ padding: '0.4rem 1.2rem', fontSize: '0.9rem' }}>Register</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
