import React, { useEffect, useRef, Suspense } from 'react';
import anime from 'animejs';
import './Hero.css';

// Lazy load the refined 3D Background
const OrbitingOrbsScene = React.lazy(() => import('./OrbitingOrbsScene'));

const Hero = () => {
    const headlineRef = useRef(null);
    const subRef = useRef(null);
    const btnGroupRef = useRef(null);
    const blobsRef = useRef(null);

    useEffect(() => {
        // Reveal Headline
        anime({
            targets: headlineRef.current.children,
            translateY: [20, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1200,
            delay: anime.stagger(100)
        });

        // Reveal Subhead
        anime({
            targets: subRef.current,
            translateY: [30, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1000,
            delay: 600
        });

        // Reveal Buttons
        anime({
            targets: btnGroupRef.current.children,
            scale: [0.8, 1],
            opacity: [0, 1],
            easing: 'spring(1, 80, 10, 0)',
            delay: anime.stagger(200, { start: 900 })
        });

        // Floating Blobs Animation
        anime({
            targets: '.blob',
            translateX: function () { return anime.random(-50, 50); },
            translateY: function () { return anime.random(-50, 50); },
            scale: function () { return anime.random(0.9, 1.1); },
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutSine',
            duration: function () { return anime.random(3000, 5000); }
        });

    }, []);

    return (
        <div className="hero-section section">
            <div className="blobs-container" ref={blobsRef}>
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>

            {/* Refined 3D Orbiting Orbs Background */}
            <Suspense fallback={null}>
                <OrbitingOrbsScene />
            </Suspense>

            <div className="container hero-content">
                <h1 className="hero-headline" ref={headlineRef}>
                    <span className="word">Helping </span>
                    <span className="word gradient-text">Small Startups </span>
                    <span className="word">Get </span>
                    <span className="word gradient-text">Qualified Leads.</span>
                </h1>

                <p className="hero-subheading" ref={subRef}>
                    Stop searching for customers. We identify high-intent demand from social communities and bring them directly to you.
                </p>

                <div className="hero-buttons" ref={btnGroupRef}>
                    <a href="#startup-registration" className="btn btn-primary">Register Your Startup</a>
                    <a href="#how-it-works" className="btn btn-secondary">How It Works</a>
                </div>
            </div>
        </div>
    );
};

export default Hero;
