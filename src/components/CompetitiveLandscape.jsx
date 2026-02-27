import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const generics = [
    'Broad training datasets',
    'Manual filtering required',
    'No prioritization framework',
    'No traction activation support'
];

const syntrix = [
    'Product-specific modeling',
    'Automated intent scoring',
    'Ranked signal system',
    'Structured activation tools'
];

const CompetitiveLandscape = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                anime({
                    targets: '.comp-col',
                    translateY: [30, 0],
                    opacity: [0, 1],
                    delay: anime.stagger(200),
                    easing: 'easeOutExpo'
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
                <h2 className="section-title">Competitive Landscape</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem' }}>
                    Generic AI Tools vs Syntrix
                </p>

                <div style={{
                    maxWidth: '900px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    <div className="comp-col glass-card" style={{ opacity: 0, padding: '2.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h3 style={{ marginBottom: '1.5rem', color: '#64748b', fontSize: '1.25rem' }}>Generic AI</h3>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {generics.map((point, i) => (
                                <li key={i} style={{ marginBottom: '1rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                    <span style={{ color: '#ef4444' }}>✕</span> {point}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="comp-col glass-card" style={{ opacity: 0, padding: '2.5rem', border: '1px solid var(--accent)', background: 'rgba(16, 185, 129, 0.05)' }}>
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent)', fontSize: '1.25rem' }}>Syntrix</h3>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {syntrix.map((point, i) => (
                                <li key={i} style={{ marginBottom: '1rem', color: 'var(--text-white)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                    <span style={{ color: 'var(--accent)' }}>✓</span> {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompetitiveLandscape;
