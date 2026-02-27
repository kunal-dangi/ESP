import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const roadmap = [
    'CRM integration',
    'API access for growth teams',
    'Advanced analytics dashboard',
    'Multi-platform signal aggregation'
];

const Roadmap = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                anime({
                    targets: '.roadmap-item',
                    translateX: [30, 0],
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
                <h2 className="section-title">Future Development Roadmap</h2>

                <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                    {roadmap.map((point, i) => (
                        <div key={i} className="roadmap-item glass-card" style={{
                            opacity: 0,
                            padding: '1rem 1.5rem',
                            color: 'var(--text-muted)',
                            fontSize: '0.95rem',
                            borderRadius: '50px'
                        }}>
                            {point}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Roadmap;
