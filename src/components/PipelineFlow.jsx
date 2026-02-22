import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './PipelineFlow.css';

// Minimal Symbolic SVGs
const IntentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="stage-icon">
        <path d="M12 2a10 10 0 0 1 10 10" opacity="0.4" />
        <path d="M12 6a6 6 0 0 1 6 6" opacity="0.7" />
        <path d="M12 10a2 2 0 0 1 2 2" />
        <path d="M12 22a10 10 0 0 0 0-20v20z" opacity="0.1" fill="currentColor" stroke="none" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
);

const AggregationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="stage-icon">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="12" r="3" />
        <line x1="9" y1="7.5" x2="15" y2="10.5" />
        <line x1="9" y1="16.5" x2="15" y2="13.5" />
    </svg>
);

const AIIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="stage-icon">
        <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="1.5" />
        <path d="M9 9h6" strokeWidth="1.5" />
        <path d="M9 12h6" strokeWidth="1.5" />
        <path d="M9 15h4" strokeWidth="1.5" />
        <circle cx="16" cy="15" r="1" fill="currentColor" stroke="none" />
        <path d="M7 7l10 10" opacity="0.2" />
    </svg>
);

const MatchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="stage-icon">
        <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="6" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
        <line x1="12" y1="2" x2="12" y2="22" opacity="0.3" />
        <line x1="2" y1="12" x2="22" y2="12" opacity="0.3" />
    </svg>
);

const ActivationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="stage-icon">
        <path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" strokeWidth="1.5" />
        <path d="M12 22v-4" />
        <path d="M12 18l-4 4" />
        <path d="M12 18l4 4" />
    </svg>
);

const STAGES = [
    { title: "Intent Detection", icon: IntentIcon },
    { title: "Signal Aggregation", icon: AggregationIcon },
    { title: "AI Qualification", icon: AIIcon },
    { title: "Match Scoring", icon: MatchIcon },
    { title: "Startup Activation", icon: ActivationIcon }
];

const PipelineFlow = () => {
    const dotRef = useRef(null);
    const containerRef = useRef(null);
    const iconWrapperRefs = useRef([]);

    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        const duration = 6000;

        // precise math for synchronization
        // Range: -10% to 110% (120 units)
        // Stages at: 0%, 25%, 50%, 75%, 100%
        // Start Offset: 10 units (since range starts at -10)
        // Stage 0: 10/120 * 6000 = 500ms
        // Stage 1: 35/120 * 6000 = 1750ms
        // Stage 2: 60/120 * 6000 = 3000ms
        // Stage 3: 85/120 * 6000 = 4250ms
        // Stage 4: 110/120 * 6000 = 5500ms

        const tl = anime.timeline({
            easing: 'linear',
            duration: duration,
            loop: true
        });

        // Loop animation for Dot
        if (isMobile) {
            tl.add({
                targets: dotRef.current,
                top: ['-10%', '110%'],
                opacity: [
                    { value: 0, duration: 100 },
                    { value: 1, duration: 200 }, // Fade In
                    { value: 1, duration: 5200 }, // Visible
                    { value: 0, duration: 300 }   // Fade Out
                ],
            }, 0);
        } else {
            tl.add({
                targets: dotRef.current,
                left: ['-10%', '110%'],
                opacity: [
                    { value: 0, duration: 100 },
                    { value: 1, duration: 200 },
                    { value: 1, duration: 5200 },
                    { value: 0, duration: 300 }
                ],
            }, 0);
        }

        const exactTimingIndices = [500, 1750, 3000, 4250, 5500];
        // The dot HEAD is ahead of its anchor (top/left) by its length (~60px).
        // 60px is approx 350ms worth of travel at this speed.
        // We shift the glow timing earlier by 350ms so it matches the HEAD arrival.
        const headLeadOffset = -350;

        STAGES.forEach((_, index) => {
            const hitTime = exactTimingIndices[index] + headLeadOffset;
            const rampUpTime = 400; // Gradual build up
            const decayTime = 200;  // Sudden decrease ("Hard Bass" drop)

            // Step 1: Bass Build Up (Gradient Increase)
            // Ends exactly at hitTime (Head at center)
            tl.add({
                targets: iconWrapperRefs.current[index],
                borderColor: ['rgba(148, 163, 184, 0.2)', '#00ff9d'],
                boxShadow: [
                    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    '0 0 25px rgba(0, 255, 157, 0.9), inset 0 0 15px rgba(0, 255, 157, 0.3)'
                ],
                scale: [1, 1.15], // Tension build
                duration: rampUpTime,
                easing: 'easeInCubic' // Accelerates into the beat
            }, Math.max(0, hitTime - rampUpTime));

            // Step 2: Bass Drop (Sudden Decrease)
            // Starts exactly at hitTime
            tl.add({
                targets: iconWrapperRefs.current[index],
                borderColor: ['#00ff9d', 'rgba(148, 163, 184, 0.2)'],
                boxShadow: [
                    '0 0 25px rgba(0, 255, 157, 0.9), inset 0 0 15px rgba(0, 255, 157, 0.3)',
                    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                ],
                scale: [1.15, 1], // Snap back
                duration: decayTime,
                easing: 'easeOutExpo' // Fast decay
            }, Math.max(0, hitTime));
        });

        return () => {
            tl.pause();
        };
    }, []);

    return (
        <div className="pipeline-wrapper" ref={containerRef}>
            {/* Background Track Line */}
            <div className="pipeline-track-layer">
                {/* Animated Glowing Dot */}
                <div className="pipeline-flowing-dot" ref={dotRef}></div>
            </div>

            {/* Stages */}
            <div className="pipeline-stages">
                {STAGES.map((stage, index) => (
                    <div className="pipeline-stage" key={index}>
                        <div
                            className="icon-wrapper"
                            ref={el => iconWrapperRefs.current[index] = el}
                        >
                            <stage.icon />
                        </div>
                        <div className="stage-info">
                            <h3>{stage.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PipelineFlow;
