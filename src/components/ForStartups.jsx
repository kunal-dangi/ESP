import React, { useEffect } from 'react';
import anime from 'animejs';
import './ForStartups.css';

const ForStartups = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                // Animate numbers
                const targets = [
                    { id: '#stat-1', val: 3, suffix: 'x' },
                    { id: '#stat-2', val: 50, suffix: '%' },
                    { id: '#stat-3', val: 100, suffix: '+' }
                ];

                targets.forEach(t => {
                    let obj = { val: 0 };
                    anime({
                        targets: obj,
                        val: t.val,
                        easing: 'easeOutExpo',
                        duration: 2000,
                        round: 1,
                        update: function () {
                            const el = document.querySelector(t.id);
                            if (el) el.innerHTML = obj.val + t.suffix;
                        }
                    });
                });

                observer.disconnect();
            }
        }, { threshold: 0.5 });

        const section = document.querySelector('.for-startups-section');
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section className="for-startups-section section" id="for-startups">
            <div className="container">
                <h2 className="section-title">Why Join Us?</h2>
                <p className="startups-subtitle">Stop chasing cold leads. Get warm introductions to people who actually want your product.</p>

                <div className="benefits-grid">
                    <div className="benefit-card glass-card">
                        <h4>Higher Conversion</h4>
                        <span className="stat" id="stat-1">3x</span>
                        <p>Better than cold outreach</p>
                    </div>
                    <div className="benefit-card glass-card">
                        <h4>Lower CAC</h4>
                        <span className="stat" id="stat-2">50%</span>
                        <p>Reduction in acquisition costs</p>
                    </div>
                    <div className="benefit-card glass-card">
                        <h4>Faster Growth</h4>
                        <span className="stat" id="stat-3">100+</span>
                        <p>Startups already joined</p>
                    </div>
                </div>

                <div className="cta-wrapper">
                    <a href="#startup-registration" className="btn btn-primary">Partner With Us</a>
                </div>
            </div>
        </section>
    );
};

export default ForStartups;
