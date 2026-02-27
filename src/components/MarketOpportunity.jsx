import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const points = [
    'Rapid growth of early-stage startups.',
    'Increasing noise across social platforms.',
    'Rising need for precision-driven traction tools.',
    'Shift toward AI-assisted decision systems.'
];

const MarketOpportunity = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                anime({
                    targets: '.market-item',
                    translateY: [20, 0],
                    opacity: [0, 1],
                    delay: anime.stagger(150),
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
                <h2 className="section-title">Market Opportunity</h2>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {points.map((point, i) => (
                            <div key={i} className="market-item glass-card" style={{
                                opacity: 0,
                                padding: '1.5rem',
                                color: 'var(--text-white)',
                                fontSize: '1.05rem',
                                borderLeft: '3px solid var(--primary)'
                            }}>
                                {point}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarketOpportunity;
