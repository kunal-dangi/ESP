import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './SuccessModal.css';

const SuccessModal = ({ isOpen, onClose }) => {
    const overlayRef = useRef(null);
    const modalRef = useRef(null);
    const checkmarkPathRef = useRef(null);
    const particlesRef = useRef(null);

    function handleClose() {
        // Exit Animation
        anime({
            targets: [overlayRef.current, modalRef.current],
            opacity: 0,
            duration: 400,
            easing: 'easeInQuad',
            complete: () => {
                if (onClose) onClose();
            }
        });
    }

    function createConfetti(container) {
        if (!container) return;
        container.innerHTML = ''; // Clear previous

        const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('confetti-particle');

            // Random styles
            const bg = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 4 + 4; // 4px to 8px

            particle.style.backgroundColor = bg;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Center start position needs to be relative to the checkmark or modal center
            // Let's place them in the center of the checkmark area roughly
            particle.style.left = '50%';
            particle.style.top = '30%'; // Approximate checkmark height position

            container.appendChild(particle);
        }

        // Animate particles
        const particles = container.querySelectorAll('.confetti-particle');

        anime({
            targets: particles,
            translateX: () => anime.random(-150, 150),
            translateY: () => anime.random(-150, 100),
            scale: [1, 0],
            opacity: [1, 0],
            easing: 'easeOutExpo',
            duration: 1500,
            autoplay: true
        });
    }

    useEffect(() => {
        if (isOpen) {
            // Reset state
            const overlay = overlayRef.current;
            const modal = modalRef.current;
            const checkmark = checkmarkPathRef.current;
            const particlesContainer = particlesRef.current;

            // 1. Overlay Fade In
            anime({
                targets: overlay,
                opacity: [0, 1],
                duration: 600,
                easing: 'easeOutQuad'
            });

            // 2. Modal Slide Up & Fade In
            anime({
                targets: modal,
                opacity: [0, 1],
                translateY: [20, 0],
                scale: [0.95, 1],
                duration: 800,
                delay: 100,
                easing: 'easeOutExpo'
            });

            // 3. Checkmark Animation
            if (checkmark) {
                // Reset stroke dash
                const length = checkmark.getTotalLength();
                checkmark.style.strokeDasharray = length;
                checkmark.style.strokeDashoffset = length;

                anime({
                    targets: checkmark,
                    strokeDashoffset: [length, 0],
                    duration: 800,
                    delay: 400,
                    easing: 'easeInOutQuad'
                });
            }

            // 4. Confetti Burst
            createConfetti(particlesContainer);

            // 5. Auto-dismiss
            const timer = setTimeout(() => {
                handleClose();
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [isOpen]);



    if (!isOpen) return null;

    return (
        <div className="modal-overlay" ref={overlayRef}>
            <div className="modal-content glass-card" ref={modalRef}>
                {/* Confetti Container inside Modal so overflow:hidden handles it or not (using container relative) */}
                <div ref={particlesRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}></div>

                <div className="checkmark-container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="checkmark-circle">
                        <svg className="checkmark-svg" viewBox="0 0 52 52">
                            <path
                                ref={checkmarkPathRef}
                                className="checkmark-check"
                                fill="none"
                                d="M14.1 27.2l7.1 7.2 16.7-16.8"
                            />
                        </svg>
                    </div>
                </div>

                <h3 className="modal-title" style={{ position: 'relative', zIndex: 1 }}>Registration Successful</h3>
                <p className="modal-subtitle" style={{ position: 'relative', zIndex: 1, marginTop: '1rem', lineHeight: '1.5' }}>
                    Your startup has been submitted for verification.<br />
                    Once our team confirms your details, you will gain access to the Founder Dashboard.
                </p>

                <button className="modal-close-btn" onClick={handleClose} style={{ position: 'relative', zIndex: 1 }}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;
