import React, { useState, useRef, useEffect } from 'react';
import './Pricing.css';

const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);
    const [isTableExpanded, setIsTableExpanded] = useState(false);
    const tableRef = useRef(null);

    // Animation on scroll could be added here similar to other sections
    // but right now standard CSS hover effects are required

    const toggleBilling = () => {
        setIsYearly(!isYearly);
    };

    const toggleTable = () => {
        setIsTableExpanded(!isTableExpanded);

        // Scroll slightly if opening table
        if (!isTableExpanded) {
            setTimeout(() => {
                tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 300);
        }
    };

    return (
        <section className="pricing-section section" id="pricing">
            <div className="container">
                <div className="pricing-header">
                    <h2 className="pricing-headline">Simple, transparent <span className="gradient-text">pricing</span></h2>
                    <p className="pricing-subheading">Choose the perfect plan for your early-stage startup.</p>

                    <div className="billing-toggle-container">
                        <span className={`toggle-label ${!isYearly ? 'active' : ''}`}>Monthly</span>
                        <button
                            className={`toggle-switch ${isYearly ? 'toggled' : ''}`}
                            onClick={toggleBilling}
                            aria-label="Toggle billing period"
                        >
                            <span className="toggle-slider"></span>
                        </button>
                        <span className={`toggle-label ${isYearly ? 'active' : ''}`}>
                            Yearly
                            <span className="discount-badge">Save 20%</span>
                        </span>
                    </div>
                </div>

                <div className="pricing-cards">
                    {/* Plan 1 - Explorer */}
                    <div className="pricing-card">
                        <div className="card-header">
                            <h3 className="plan-name">Individual Validation</h3>
                            <p className="plan-tagline">General AI model for early idea testing. Designed for signal exploration and validation.</p>
                            <div className="plan-price">
                                <span className="currency">$</span>
                                <span className="amount">0</span>
                                <span className="period">/month</span>
                            </div>
                        </div>
                        <div className="card-body">
                            <ul className="feature-list">
                                <li>
                                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    General AI signal detection
                                </li>
                                <li>
                                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    Broad market scanning
                                </li>
                                <li>
                                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    Community-trained matching
                                </li>
                                <li>
                                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    Trend-based insights
                                </li>
                                <li>
                                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    ~80% relevance accuracy
                                </li>
                            </ul>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-secondary plan-btn">Start Free</button>
                            <p className="plan-note">No credit card required.</p>
                        </div>
                    </div>

                    {/* Plan 2 - Growth */}
                    <div className="pricing-card highlighted">
                        <div className="popular-badge">Most Popular</div>
                        <div className="card-header">
                            <h3 className="plan-name accent-text">Team Intelligence</h3>
                            <p className="plan-tagline">Dedicated product-specific AI model built for startup teams. Improves signal precision and reduces manual filtering time.</p>
                            <div className="plan-price fade-in">
                                <span className="currency">$</span>
                                <span className="amount">{isYearly ? '24' : '30'}</span>
                                <span className="period">/month</span>
                            </div>
                        </div>
                        <div className="card-body">
                            <ul className="feature-list">
                                <li>
                                    <svg className="check-icon accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    Dedicated product-specific AI model
                                </li>
                                <li>
                                    <svg className="check-icon accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    Precision intent detection
                                </li>
                                <li>
                                    <svg className="check-icon accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    99% relevance accuracy
                                </li>
                                <li>
                                    <svg className="check-icon accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    Advanced match scoring
                                </li>
                                <li>
                                    <svg className="check-icon accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    Signal prioritization dashboard
                                </li>
                            </ul>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary plan-btn highlight-btn">Upgrade to Team Intelligence</button>
                            <p className="plan-note" style={{ marginTop: '1rem', textAlign: 'center' }}>Designed to increase qualified signal detection efficiency.</p>
                        </div>
                    </div>

                    {/* Plan 3 - Pro */}
                    <div className="pricing-card">
                        <div className="card-header">
                            <h3 className="plan-name">Team Activation</h3>
                            <p className="plan-tagline">Everything in Team Intelligence, plus automated traction activation tools.</p>
                            <div className="plan-price fade-in">
                                <span className="currency">$</span>
                                <span className="amount">{isYearly ? '40' : '50'}</span>
                                <span className="period">/month</span>
                            </div>
                        </div>
                        <div className="card-body">
                            <ul className="feature-list">
                                <li>
                                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    Everything in Team Intelligence
                                </li>
                                <li>
                                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    AI-generated personalized outreach drafts
                                </li>
                                <li>
                                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    Context-aware response suggestions
                                </li>
                                <li>
                                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    Competitive positioning insights
                                </li>
                                <li>
                                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    Engagement optimization tools
                                </li>
                            </ul>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-secondary plan-btn">Go Team Activation</button>
                            <p className="plan-note">Converts detected signals into structured growth actions.</p>
                        </div>
                    </div>
                </div>

                <div className="compare-section" ref={tableRef}>
                    <button className="compare-toggle" onClick={toggleTable}>
                        Compare plans in detail
                        <svg className={`chevron ${isTableExpanded ? 'rotated' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <div className={`compare-table-container ${isTableExpanded ? 'expanded' : ''}`}>
                        <table className="compare-table">
                            <thead>
                                <tr>
                                    <th>Features</th>
                                    <th>Individual Validation</th>
                                    <th className="highlight-col">Team Intelligence</th>
                                    <th>Team Activation</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Signal Precision</td>
                                    <td>~80%</td>
                                    <td className="highlight-cell">99%</td>
                                    <td>99%</td>
                                </tr>
                                <tr>
                                    <td>Model Type</td>
                                    <td>General</td>
                                    <td className="highlight-cell">Product-Specific</td>
                                    <td>Product-Specific</td>
                                </tr>
                                <tr>
                                    <td>Match Scoring</td>
                                    <td>Basic</td>
                                    <td className="highlight-cell">Advanced</td>
                                    <td>Advanced</td>
                                </tr>
                                <tr>
                                    <td>Outreach Automation</td>
                                    <td><span className="dash">-</span></td>
                                    <td className="highlight-cell"><span className="dash">-</span></td>
                                    <td><span className="check-white">✓</span></td>
                                </tr>
                                <tr>
                                    <td>Competitive Positioning Analysis</td>
                                    <td><span className="dash">-</span></td>
                                    <td className="highlight-cell"><span className="dash">-</span></td>
                                    <td><span className="check-white">✓</span></td>
                                </tr>
                                <tr>
                                    <td>Engagement Tools</td>
                                    <td><span className="dash">-</span></td>
                                    <td className="highlight-cell"><span className="dash">-</span></td>
                                    <td><span className="check-white">✓</span></td>
                                </tr>
                                <tr>
                                    <td>Traction Activation Layer</td>
                                    <td><span className="dash">-</span></td>
                                    <td className="highlight-cell"><span className="dash">-</span></td>
                                    <td><span className="check-white">✓</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="pricing-rationale-section">
                    <h3 className="rationale-title">Why Pricing Scales</h3>
                    <div className="rationale-grid">
                        <div className="rationale-card">
                            <h4>Individual Validation</h4>
                            <p>Broad model trained on general datasets for exploratory use.</p>
                        </div>
                        <div className="rationale-card highlight">
                            <h4>Team Intelligence</h4>
                            <p>Product-specific model improves signal filtering efficiency and increases actionable insight quality.</p>
                        </div>
                        <div className="rationale-card">
                            <h4>Team Activation</h4>
                            <p>Adds automated engagement and positioning tools to accelerate customer acquisition.</p>
                        </div>
                    </div>
                </div>

                <div className="roi-framing-section">
                    <p>If one additional customer is acquired through improved signal precision, the Team Activation plan pays for itself.</p>
                </div>

                <div className="trust-section">
                    <div className="trust-item">
                        <svg className="trust-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Cancel anytime.</span>
                    </div>
                    <div className="trust-item">
                        <svg className="trust-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4V10M4 10H10M4 10L8.5 5.5C10.3755 3.62452 13.0857 2.81057 15.7001 3.25134C18.3145 3.6921 20.4907 5.33045 21.6025 7.68962M20 20V14M20 14H14M20 14L15.5 18.5C13.6245 20.3755 10.9143 21.1894 8.2999 20.7487C5.68549 20.3079 3.50935 18.6695 2.39752 16.3104" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Upgrade or downgrade anytime.</span>
                    </div>
                    <div className="trust-item">
                        <svg className="trust-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Built for early-stage startup teams.</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
