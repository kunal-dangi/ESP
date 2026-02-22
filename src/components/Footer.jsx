import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>DemandIntel</h3>
                        <p>Turning Online Demand into Startup Growth.</p>
                    </div>
                    <div className="footer-links">
                        <a href="#">About</a>
                        <a href="#">Contact</a>
                        <a href="#">Privacy Policy</a>
                    </div>
                </div>
                <div className="footer-copyright">
                    © 2026 DemandIntel. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
