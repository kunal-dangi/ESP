import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './SignalOverlay.css';

const SignalOverlay = () => {
    const transparentRef = useRef(null);
    const neonRef = useRef(null);

    useEffect(() => {
        // Layer 1: Transparent Circles (Random Movement)
        anime({
            targets: '.sig-circle-trans',
            translateX: function () {
                return anime.random(-100, 100);
            },
            translateY: function () {
                return anime.random(-100, 100);
            },
            scale: function () {
                return anime.random(0.5, 1.5);
            },
            easing: 'easeInOutSine',
            duration: function () {
                return anime.random(5000, 8000);
            },
            delay: function () {
                return anime.random(0, 1000);
            },
            direction: 'alternate',
            loop: true
        });

        // Layer 2: Neon Green Signal Circles (Same Trajectory)
        // Moving diagonally up-right slowly
        anime({
            targets: '.sig-circle-neon',
            translateX: [0, 200],
            translateY: [0, -100],
            scale: [0.8, 1.2],
            opacity: [0.3, 0.6],
            easing: 'linear',
            duration: 12000,
            loop: true,
            delay: anime.stagger(1500) // Staggered start to create a trail effect
        });

    }, []);

    // Generate elements
    const transparentCircles = Array.from({ length: 20 }).map((_, i) => ({
        style: {
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`
        }
    }));

    const neonCircles = Array.from({ length: 6 }).map((_, i) => ({
        style: {
            // Start grouped or spread slightly? User said "Same trajectory".
            // If they start at different points but move same, they are parallel.
            // If they are staggered (trail), they should start near or along path.
            // Let's spread them a bit but not too much.
            left: `${30 + (i * 5)}%`, // Trail horizontally
            top: `${60 - (i * 2)}%`  // Trail vertically
        }
    }));

    return (
        <div className="signal-overlay-container">
            {/* Layer 3: Subtle Scratch Lines (Drift CSS) */}
            <div className="signal-layer-scratch"></div>

            {/* Layer 1: Transparent Circles */}
            <div className="signal-layer-transparent" ref={transparentRef}>
                {transparentCircles.map((circle, i) => (
                    <div
                        key={i}
                        className="sig-circle-trans"
                        style={circle.style}
                    ></div>
                ))}
            </div>

            {/* Layer 2: Neon Green Signal Circles */}
            <div className="signal-layer-neon" ref={neonRef}>
                {neonCircles.map((circle, i) => (
                    <div
                        key={i}
                        className="sig-circle-neon"
                        style={circle.style}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default SignalOverlay;
