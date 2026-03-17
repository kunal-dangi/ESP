import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import anime from 'animejs';
import './FounderDashboard.css';

const FounderDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [verificationStatus, setVerificationStatus] = useState('Pending');
    const [currentPlan, setCurrentPlan] = useState('Free Plan');
    const [trialDaysLeft, setTrialDaysLeft] = useState(null);
    const [showTrialModal, setShowTrialModal] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        if (location.state?.showTrialModal) {
            setShowTrialModal(true);
            // Replace state to avoid re-triggering upon refresh
            navigate('/dashboard', { replace: true, state: {} });
        }
    }, [location, navigate]);

    useEffect(() => {
        if (showTrialModal && modalRef.current) {
            anime({
                targets: modalRef.current,
                opacity: [0, 1],
                scale: [0.9, 1],
                duration: 600,
                easing: 'easeOutExpo'
            });

            const timer = setTimeout(() => {
                closeModal();
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [showTrialModal]);

    const closeModal = () => {
        if (modalRef.current) {
            anime({
                targets: modalRef.current,
                opacity: [0],
                scale: [1, 0.9],
                duration: 400,
                easing: 'easeInExpo',
                complete: () => setShowTrialModal(false)
            });
        } else {
            setShowTrialModal(false);
        }
    };

    useEffect(() => {
        // Enforce basic access control
        const isRegistered = localStorage.getItem('startupRegistered') === 'true';
        if (!isRegistered) {
            navigate('/');
        }
        
        // Retrieve verification status
        const status = localStorage.getItem('verificationStatus');
        if (status) {
            setVerificationStatus(status);
        }

        // Retrieve current plan
        const planMap = {
            'free-plan': 'Free Plan',
            'team-intelligence': 'Team Intelligence',
            'team-activation': 'Team Activation',
            'team-intelligence-trial': 'Team Intelligence (Trial)'
        };
        let savedPlan = localStorage.getItem('userPlan');
        
        if (savedPlan === 'team-intelligence-trial') {
            const trialStart = localStorage.getItem('trialStartDate');
            if (trialStart) {
                const now = new Date().getTime();
                const daysPassed = Math.floor((now - parseInt(trialStart)) / (1000 * 60 * 60 * 24));
                const daysLeft = 7 - daysPassed;
                
                setTrialDaysLeft(daysLeft);
                
                if (daysLeft <= 0) {
                    localStorage.setItem('userPlan', 'free-plan');
                    savedPlan = 'free-plan';
                }
            }
        }

        if (savedPlan && planMap[savedPlan]) {
            setCurrentPlan(planMap[savedPlan]);
        }
    }, [navigate]);

    const headerRef = useRef(null);
    const overviewRef = useRef(null);
    const statsRef = useRef(null);
    const signalsRef = useRef(null);
    const responseRef = useRef(null);

    useEffect(() => {
        // Simple entrance animations matching Syntrix UI style
        anime({
            targets: [headerRef.current, overviewRef.current, statsRef.current, responseRef.current],
            translateY: [20, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1000,
            delay: anime.stagger(150),
        });

        anime({
            targets: '.signal-card',
            translateY: [20, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 800,
            delay: anime.stagger(100, { start: 400 })
        });
    }, []);

    const mockStats = [
        { label: 'Signals Detected', value: 18 },
        { label: 'High Intent Leads', value: 7 },
        { label: 'Platforms Monitored', value: 5 }
    ];

    const mockSignals = [
        {
            platform: 'Reddit',
            post: "Does anyone know a good tool to manage remote teams? Spreadsheets are getting too messy.",
            score: '9.1 / 10',
            priority: 'High Intent Lead',
            colorClass: 'signal-high',
            action: 'Introduce your product as a possible solution.'
        },
        {
            platform: 'Twitter',
            post: "Looking for recommendations on project management software that isn't too expensive for small teams.",
            score: '7.8 / 10',
            priority: 'Medium Opportunity',
            colorClass: 'signal-medium',
            action: 'Highlight cost-effectiveness.'
        },
        {
            platform: 'Hacker News',
            post: "What are the alternatives to Jira? We are a team of 4 and it's an overkill.",
            score: '8.4 / 10',
            priority: 'High Intent Lead',
            colorClass: 'signal-high',
            action: 'Pitch your lightweight team features.'
        },
        {
            platform: 'LinkedIn',
            post: "Thinking about switching our communication stack. What's working for remote-first teams lately?",
            score: '4.2 / 10',
            priority: 'Low Priority',
            colorClass: 'signal-low',
            action: 'Monitor for now.'
        }
    ];

    return (
        <div className="founder-dashboard">
            {showTrialModal && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
                    backgroundColor: 'rgba(5, 5, 5, 0.8)', zIndex: 1000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    backdropFilter: 'blur(5px)'
                }}>
                    <div ref={modalRef} className="glass-card trial-modal" style={{
                        padding: '2.5rem', maxWidth: '450px', width: '90%', 
                        position: 'relative', textAlign: 'center',
                        border: '1px solid var(--neon-green)',
                        boxShadow: '0 0 20px rgba(56, 233, 140, 0.15)',
                        opacity: 0, transform: 'scale(0.9)'
                    }}>
                        <button onClick={closeModal} style={{
                            position: 'absolute', top: '1rem', right: '1rem', 
                            background: 'none', border: 'none', color: 'var(--text-secondary)',
                            cursor: 'pointer', fontSize: '1.5rem', lineHeight: 1
                        }}>
                            &times;
                        </button>
                        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="32" cy="32" r="30" stroke="var(--neon-green)" strokeWidth="4" strokeOpacity="0.4"/>
                                <path d="M18 32l10 10 18-18" fill="none" stroke="var(--neon-green)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.75rem' }}>Free Trial Activated</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            Your 7-day <span style={{ color: 'var(--neon-green)', fontWeight: 'bold' }}>Team Intelligence</span> trial is now active.
                        </p>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            You can now explore premium signal detection features.
                        </p>
                    </div>
                </div>
            )}
            <div className="container dashboard-container">
                {trialDaysLeft !== null && trialDaysLeft > 0 && (
                    <div className="glass-card" style={{ padding: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                        <p style={{ margin: 0, fontSize: '0.95rem' }}>
                            Your Team Intelligence trial is active — <span style={{ color: 'var(--neon-blue)', fontWeight: 'bold' }}>{trialDaysLeft} days remaining</span>.
                        </p>
                        <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => { navigate('/'); setTimeout(() => { document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }, 500); }}>Upgrade Now</button>
                    </div>
                )}
                {/* 1. Welcome Header */}
                <header className="dashboard-header" ref={headerRef}>
                    <h1 className="dashboard-title">Welcome to <span className="gradient-text">Syntrix Intelligence</span></h1>
                    <p className="dashboard-subtitle">Monitor demand signals and discover potential users looking for solutions like yours.</p>
                </header>

                <div className="dashboard-grid">
                    {/* Left Column */}
                    <div className="dashboard-left">
                        {/* 2. Startup Overview Card */}
                        <div className="glass-card overview-card" ref={overviewRef}>
                            <h2 className="card-title">Startup Overview</h2>
                            <div className="overview-details">
                                <div className="detail-row">
                                    <span className="label">Startup:</span>
                                    <span className="value">TaskFlow AI</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Category:</span>
                                    <span className="value">Productivity Software</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Verification Status:</span>
                                    <span className={`value status-${verificationStatus.toLowerCase()}`}>{verificationStatus}</span>
                                </div>
                            </div>
                        </div>

                        {/* Current Plan Card */}
                        <div className="glass-card plan-card" style={{ padding: '1.5rem' }}>
                            <h2 className="card-title">Current Plan</h2>
                            <div className="detail-row" style={{ marginTop: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                                <span className="value gradient-text" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{currentPlan}</span>
                            </div>
                            {trialDaysLeft !== null && (
                                <div className="detail-row" style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    <span className="label" style={{ fontSize: '0.9rem' }}>Trial Status:</span>
                                    <span className={`value`} style={{ color: trialDaysLeft > 0 ? 'var(--neon-green)' : '#ef4444', fontWeight: '500' }}>
                                        {trialDaysLeft > 0 ? `Trial Active: ${trialDaysLeft} days remaining` : 'Trial Expired – Please Upgrade'}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* 5. Usage Analytics (Mock) */}
                        <div className="glass-card stats-card" ref={statsRef}>
                            <h2 className="card-title">Usage Analytics</h2>
                            <p className="section-desc">Activity this week</p>
                            <div className="stats-grid">
                                {mockStats.map((stat, i) => (
                                    <div className="stat-box" key={i}>
                                        <div className="stat-value gradient-text">{stat.value}</div>
                                        <div className="stat-label">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. AI Suggested Response Section */}
                        <div className="glass-card response-card" ref={responseRef}>
                            <h2 className="card-title">AI Suggested Response</h2>
                            <p className="section-desc">Based on highest priority lead</p>
                            <div className="response-box">
                                <p>"You might want to check out TaskFlow AI. It helps teams manage tasks and remote collaboration efficiently."</p>
                            </div>
                            <button className="btn btn-primary approve-btn">Approve & Use</button>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="dashboard-right" ref={signalsRef}>
                        <h2 className="section-title-small">Detected Demand Signals</h2>
                        <div className="signals-list">
                            {mockSignals.map((signal, i) => (
                                <div className="glass-card signal-card" key={i}>
                                    <div className="signal-header">
                                        <span className={`signal-badge ${signal.colorClass}`}>{signal.priority}</span>
                                        <span className="signal-platform">{signal.platform}</span>
                                    </div>
                                    <div className="signal-body">
                                        <p className="user-post">"{signal.post}"</p>
                                    </div>
                                    <div className="signal-footer">
                                        <div className="intent-score">
                                            <span className="label">Intent Score:</span>
                                            <span className="value">{signal.score}</span>
                                        </div>
                                        <div className="suggested-action">
                                            <span className="label">Suggested Action:</span>
                                            <span className="value">{signal.action}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FounderDashboard;
