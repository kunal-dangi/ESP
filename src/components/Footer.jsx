import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>Syntrix</h3>
                        <p>Precision Signal Intelligence for Startup Teams.</p>
                    </div>
                    <div className="footer-links">
                        <a href="#">About</a>
                        <a href="#">Contact</a>
                        <a href="#">Privacy Policy</a>
                    </div>
                </div>
                <div className="footer-copyright">
                    © 2026 Syntrix. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
