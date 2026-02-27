import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './Footer.css';

const Footer = () => {
    const socialRef = useRef(null);

    useEffect(() => {
        // Smooth fade-in on page load for social links container
        anime({
            targets: socialRef.current,
            opacity: [0, 1],
            translateY: [10, 0],
            easing: 'easeOutSine',
            duration: 1000,
            delay: 300
        });
    }, []);

    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>Syntrix</h3>
                        <p>Precision Signal Intelligence for Startup Teams.</p>
                    </div>
                    <div className="footer-social-wrapper" ref={socialRef} style={{ opacity: 0 }}>
                        <p className="connect-text">Connect with Syntrix</p>
                        <div className="footer-links">
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Reddit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8c2.668 0 5.083 .905 6.885 2.384c1.514 -.293 3.115 1.107 3.115 2.871c0 1.802 -1.411 3.26 -3.155 3.26c-.34 0 -.67 -.08 -1.02 -.253c-1.282 2.222 -3.42 3.738 -5.825 3.738c-2.406 0 -4.544 -1.516 -5.825 -3.738c-.35 .173 -.68 .253 -1.02 .253c-1.745 0 -3.155 -1.458 -3.155 -3.26c0 -1.764 1.6 -3.164 3.115 -2.871c1.802 -1.48 4.217 -2.384 6.885 -2.384z" /><path d="M12 8v-4l4 2" /><circle cx="9" cy="13" r=".5" fill="currentColor" /><circle cx="15" cy="13" r=".5" fill="currentColor" /><path d="M10 16a2 2 0 1 0 4 0" /></svg>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                            </a>
                        </div>
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
