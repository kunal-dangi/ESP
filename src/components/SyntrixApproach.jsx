import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const points = [
    'Product-specific AI modeling',
    'Intent classification engine',
    'Ranked signal prioritization',
    'Traction activation support'
];

const SyntrixApproach = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                anime({
                    targets: '.approach-item',
                    translateX: [-30, 0],
                    opacity: [0, 1],
                    delay: anime.stagger(150),
                    easing: 'easeOutExpo'
                });
                anime({
                    targets: '.approach-desc',
                    translateY: [20, 0],
                    opacity: [0, 1],
                    delay: 600,
                    easing: 'easeOutQuad'
                });
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.2 });

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="section" ref={sectionRef} style={{ background: 'var(--bg-dark)' }}>
            <div className="container">
                <h2 className="section-title">The Syntrix Approach</h2>

                <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem' }}>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                        {points.map((point, i) => (
                            <li key={i} className="approach-item" style={{
                                opacity: 0,
                                marginBottom: '1rem',
                                color: 'var(--text-white)',
                                fontSize: '1.1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>//</span> {point}
                            </li>
                        ))}
                    </ul>
                    <p className="approach-desc" style={{
                        opacity: 0,
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        paddingTop: '1.5rem',
                        color: 'var(--text-muted)',
                        fontSize: '1rem',
                        lineHeight: '1.6'
                    }}>
                        Syntrix transforms scattered digital conversations into structured, prioritized, and actionable demand signals for startup teams.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SyntrixApproach;
