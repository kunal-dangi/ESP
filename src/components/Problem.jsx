import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './Problem.css';

const features = [
    {
        icon: '📊',
        title: 'Public Demand',
        desc: 'Millions of users post what they need on Reddit, X, and Facebook every day.',
    },
    {
        icon: '🔍',
        title: 'Hard to Find',
        desc: 'General AI models often result in reduced signal precision when sorting through social noise.',
    },
    {
        icon: '💡',
        title: 'We Bridge The Gap',
        desc: 'Our AI filters noise and delivers qualified leads directly to startup teams.',
    },
];

const Problem = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    anime({
                        targets: '.feature-card',
                        translateY: [50, 0],
                        opacity: [0, 1],
                        delay: anime.stagger(200),
                        easing: 'easeOutQuad'
                    });
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <section className="problem-section section" ref={sectionRef} id="problem">
            <div className="container">
                <h2 className="section-title">Why We Built This?</h2>
                <p className="section-subtitle">Real problems need real solutions. Startups fail when they build what nobody wants. We fix that.</p>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card glass-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Problem;
