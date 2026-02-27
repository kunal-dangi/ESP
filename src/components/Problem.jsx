import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './Problem.css';

const problems = [
    'Startup teams struggle to identify high-intent demand signals across noisy digital platforms.',
    'Manual filtering of discussions and comments is inefficient.',
    'Generic AI tools lack product-specific signal precision.',
    'High-value early adopters are often buried in digital noise.'
];

const Problem = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    anime({
                        targets: '.problem-list li',
                        translateY: [20, 0],
                        opacity: [0, 1],
                        delay: anime.stagger(150),
                        easing: 'easeOutQuad'
                    });
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <section className="problem-section section" ref={sectionRef} id="problem">
            <div className="container">
                <h2 className="section-title">The Problem</h2>

                <div style={{ maxWidth: '800px', margin: '0 auto' }} className="problem-list glass-card">
                    <ul style={{ listStyleType: 'disc', padding: '2rem 3rem', color: 'var(--text-white)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                        {problems.map((point, index) => (
                            <li key={index} style={{ marginBottom: '1rem', opacity: 0 }}>{point}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Problem;
