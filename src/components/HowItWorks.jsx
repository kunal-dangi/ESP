import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './HowItWorks.css';

const steps = [
    { title: 'Capture Demand', desc: 'Our AI scans platforms like Reddit & X to find users actively asking for solutions.' },
    { title: 'Qualify & Match', desc: 'We verify the intent and match the request with the perfect startup building it.' },
    { title: 'Connect', desc: 'We facilitate a warm introduction so you can solve their problem instantly.' }
];

const HowItWorks = () => {
    const timelineRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                // Line growth
                anime({
                    targets: '.timeline-line',
                    height: ['0%', '100%'],
                    easing: 'easeInOutQuad',
                    duration: 1500
                });

                // Cards sliding in
                anime({
                    targets: '.step-card',
                    translateX: [-50, 0],
                    opacity: [0, 1],
                    delay: anime.stagger(300),
                    easing: 'easeOutExpo'
                });
            }
        }, { threshold: 0.2 });

        if (timelineRef.current) observer.observe(timelineRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="how-section section" id="how-it-works" ref={timelineRef}>
            <div className="container">
                <h2 className="section-title">How It Works</h2>
                <div className="timeline-container">
                    <div className="timeline-line"></div>
                    {steps.map((step, i) => (
                        <div key={i} className="step-row">
                            <div className="step-marker">{i + 1}</div>
                            <div className="step-card glass-card">
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
